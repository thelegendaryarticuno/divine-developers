import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

const uri = process.env.MONGO_URI || "your-mongodb-uri";

async function connectToDatabase() {
  if (cachedDb) {
    return { collection: cachedDb.collection("register"), client: cachedClient };
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  const db = cachedClient.db("DivineDevelopers");
  cachedDb = db;

  return { collection: db.collection("register"), client: cachedClient };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill out all fields" });
    }

    try {
      const { collection } = await connectToDatabase();

      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "User already registered with this email" });
      }

      const result = await collection.insertOne({ name, email, password });

      return res.status(201).json({ message: "User registered successfully", result });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ error: "Registration failed" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

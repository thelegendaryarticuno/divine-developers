import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// Global variable to cache the MongoClient
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

// MongoDB connection URI
const uri = process.env.MONGO_URI || "mongodb+srv://namanmani457:naman43%23@divinedevelopers.nqxo4.mongodb.net/DivineDevelopers?retryWrites=true&w=majority&appName=DivineDevelopers";

// Function to connect to MongoDB with caching
async function connectToDatabase() {
  if (cachedDb) {
    // Reuse the existing database connection
    return { collection: cachedDb.collection("register"), client: cachedClient };
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri); // No options needed for modern MongoDB driver
    await cachedClient.connect();
  }

  const db = cachedClient.db("DivineDevelopers");
  cachedDb = db;

  return { collection: db.collection("register"), client: cachedClient };
}

// API route to handle registration
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill out all fields" });
    }

    try {
      // Connect to the MongoDB collection (with connection reuse)
      const { collection } = await connectToDatabase();

      // Check if the email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "User already registered with this email" });
      }

      // Insert the data into the collection
      const result = await collection.insertOne({ name, email, password });

      // Return success response
      return res.status(201).json({ message: "User registered successfully", result });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ error: "Registration failed" });
    }
  } else {
    // Handle other request methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

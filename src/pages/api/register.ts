import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// MongoDB connection URI
const uri = "mongodb+srv://namanmani457:naman43%23@divinedevelopers.nqxo4.mongodb.net/DivineDevelopers?retryWrites=true&w=majority&appName=DivineDevelopers";

// Function to connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("DivineDevelopers");
    const collection = db.collection("register");
    return { collection, client };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}

// API route to handle registration
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill out all fields" });
    }

    try {
      // Connect to the MongoDB collection
      const { collection, client } = await connectToDatabase();

      // Check if the email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "User already registered with this email" });
      }

      // Insert the data into the collection
      const result = await collection.insertOne({ name, email, password });

      // Close the connection
      client.close();

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

import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Utility to get Mongo collection
const getCollection = async () => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  return db.collection(collectionName);
};

// GET all socks
app.get('/socks', async (req, res) => {
  try {
    const collection = await getCollection();
    const socks = await collection.find({}).toArray();
    res.json(socks);
  } catch (error) {
    console.error('Error fetching socks:', error);
    res.status(500).send('Failed to retrieve socks.');
  }
});

// POST /socks/search - Search socks by color
app.post('/socks/search', async (req, res) => {
    try {
      const { color } = req.body;
  
      if (!color) {
        return res.status(400).json({ message: "Missing color field in request." });
      }
  
      const collection = await getCollection();
      const results = await collection.find({
        "sockDetails.color": { $regex: new RegExp(`^${color}$`, 'i') }
      }).toArray();
  
      res.json(results);
    } catch (err) {
      console.error("Search error:", err);
      res.status(500).send("Search failed.");
    }
  });
  
  

// POST a new sock
app.post('/socks', async (req, res) => {
  try {
    const newSock = req.body;

    if (!newSock.sockDetails || !newSock.additionalFeatures) {
      return res.status(400).send({ message: 'Invalid sock format.' });
    }

    newSock.addedTimestamp = new Date().toISOString();

    const collection = await getCollection();
    const result = await collection.insertOne(newSock);

    res.status(201).json({ message: 'Sock added!', sock: { _id: result.insertedId, ...newSock } });
  } catch (error) {
    console.error('Error adding sock:', error);
    res.status(500).send('Failed to add sock.');
  }
});

// PUT update a sock by ID
app.put('/socks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const collection = await getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'Sock not found.' });
    }

    res.json({ message: 'Sock updated successfully.' });
  } catch (error) {
    console.error('Error updating sock:', error);
    res.status(500).send('Failed to update sock.');
  }
});

// DELETE a sock by ID
app.delete('/socks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Sock not found.' });
    }

    res.json({ message: 'Sock deleted successfully.' });
  } catch (error) {
    console.error('Error deleting sock:', error);
    res.status(500).send('Failed to delete sock.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import upload from "./upload.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser'
import { User } from "./models/User.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
app.use(cors());
const port = 8000 || process.env.PORT;
app.use('/uploads', express.static('uploads'));


//Mongodb Connection Setup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongodb Connected successfully"))
  .catch((error) => console.error(error));


app.post('/submit', async (req, res) => {
    const { name, socialHandle } = req.body;
    
    // const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    try {
      const newUser = new User({ name, socialHandle,});
     const saveduser =  await newUser.save();
      res.status(201).json({ message: 'User data saved successfully',saveduser });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save user data' });
    }
  });
  
  // Route to fetch all submissions
  app.get('/submissions', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  });



  app.listen(port, () =>
    console.log(`server running on http://localhost:${port}`)
  );
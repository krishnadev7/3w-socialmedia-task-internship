import dotenv from "dotenv";
dotenv.config();

import upload from "./upload.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { User } from "./models/User.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000 || process.env.PORT;

const corsOptions = {
  origin: ["https://radiant-dodol-0888f0.netlify.app","https://3w-socialmedia-task-internship.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/uploads", express.static("uploads"));

//Mongodb Connection Setup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongodb Connected successfully"))
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/submit", upload.array("images", 5), async (req, res) => {
  const { name, socialHandle } = req.body;

  const imagePaths = req.files.map((file) => file.path);
  try {
    const newUser = new User({ name, socialHandle, images: imagePaths });
    const saveduser = await newUser.save();
    res
      .status(201)
      .json({ message: "User data saved successfully", saveduser });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user data" });
  }
});

// Route to fetch all submissions
app.get("/submissions", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);

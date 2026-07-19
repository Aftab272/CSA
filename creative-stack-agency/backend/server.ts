import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

if (process.env.MONGODB_URI) {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
} else {
  console.warn("MONGODB_URI not set, skipping DB connection");
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Creative Stack Agency API is running" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

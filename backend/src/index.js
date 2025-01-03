import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import songRoutes from "./routes/songs.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("MongoDB URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use("/api/songs", songRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
}); 

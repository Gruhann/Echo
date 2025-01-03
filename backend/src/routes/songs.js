import express from "express";
import Song from "../models/Song.js";

const router = express.Router();

// Get all songs
router.get("/", async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new song
router.post("/", async (req, res) => {
    const song = new Song(req.body);
    try {
        const savedSong = await song.save();
        res.status(201).json(savedSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router; 
import express from "express";
import LikedSong from "../models/LikedSong.js";
import Song from "../models/Song.js";

const router = express.Router();

// Get all liked songs
router.get("/liked-songs", async (req, res) => {
    try {
        const likedSongs = await LikedSong.find()
            .populate('song');
        const songs = likedSongs.map(like => like.song);
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching liked songs' });
    }
});

// Add song to liked songs
router.post("/liked-songs", async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const existingLike = await LikedSong.findOne({
            user: user._id,
            song: req.body.songId
        });

        if (existingLike) {
            return res.status(400).json({ message: 'Song already liked' });
        }

        const song = await Song.findById(req.body.songId);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        const likedSong = new LikedSong({
            user: user._id,
            song: req.body.songId
        });
        await likedSong.save();

        res.status(201).json(song);
    } catch (error) {
        console.error('Error adding song to liked songs:', error);
        res.status(500).json({ message: 'Error adding song to liked songs', error: error.message });
    }
});

// Remove song from liked songs
router.delete("/liked-songs/:id", async (req, res) => {
    try {
        await LikedSong.findOneAndDelete({
            user: req.user._id,
            song: req.params.id
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error removing song from liked songs' });
    }
});

export default router; 
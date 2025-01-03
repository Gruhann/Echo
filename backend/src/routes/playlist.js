import express from "express";
import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";

const router = express.Router();

// Get all playlists for the user
router.get("/playlists", async (req, res) => {
    try {
        const playlists = await Playlist.find()
            .populate('songs');
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlists' });
    }
});

// Create new playlist
router.post("/playlists", async (req, res) => {
    try {
        const playlist = new Playlist({
            name: req.body.name,
            songs: req.body.songs || []
        });
        await playlist.save();
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error creating playlist' });
    }
});

// Add song to playlist
router.post("/playlists/:id/songs", async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        const song = await Song.findById(req.body.songId);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        if (!playlist.songs.includes(song._id)) {
            playlist.songs.push(song._id);
            await playlist.save();
        }

        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error adding song to playlist' });
    }
});

export default router; 
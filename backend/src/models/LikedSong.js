import mongoose from "mongoose";

const likedSongSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('LikedSong', likedSongSchema); 
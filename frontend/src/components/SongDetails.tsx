import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Pause, Heart } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";
import axios from "axios";
import { usePlaylist } from '../contexts/PlaylistContext';

interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    url: string;
}

const SongDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState(true);
    const { currentSong, isPlaying, playSong, pauseSong } = useAudio();
    const { isLiked, toggleLikedSong } = usePlaylist();

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                if (!id) return;
                const token = localStorage.getItem("token");
                console.log("Fetching song with ID:", id);
                const response = await axios.get(`http://localhost:5000/api/songs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSong(response.data);
            } catch (error) {
                console.error("Error fetching song details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongDetails();
    }, [id]);

    const handlePlayClick = () => {
        if (!song) return;
        
        if (currentSong?._id === song._id && isPlaying) {
            pauseSong();
        } else {
            playSong(song);
        }
    };

    if (loading) {
        return <div className="p-8 text-white">Loading...</div>;
    }

    if (!song) {
        return <div className="p-8 text-white">Song not found</div>;
    }

    return (
        <div className="p-8">
            <div className="flex items-start gap-8">
                <div className="w-64 h-64 bg-zinc-800 rounded-lg flex-shrink-0"></div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold text-white">{song.title}</h1>
                    <p className="text-xl text-zinc-400">{song.artist}</p>
                    <p className="text-zinc-400">{song.album}</p>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePlayClick}
                            className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition"
                        >
                            {currentSong?._id === song._id && isPlaying ? (
                                <Pause size={32} className="text-black" />
                            ) : (
                                <Play size={32} className="text-black ml-1" />
                            )}
                        </button>
                        <button
                            onClick={() => toggleLikedSong(song)}
                            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-zinc-800 transition"
                        >
                            <Heart
                                size={24}
                                className={`${
                                    isLiked(song._id)
                                        ? 'fill-green-500 text-green-500'
                                        : 'text-zinc-400 hover:text-white'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongDetails; 
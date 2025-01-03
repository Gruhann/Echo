import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";

interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    url: string;
}

const SongDetails = () => {
    const { id } = useParams();
    const [song, setSong] = useState<Song | null>(null);
    const { currentSong, isPlaying, playSong, pauseSong } = useAudio();

    useEffect(() => {
        // Find song from your songs list or fetch from API
        const songs = JSON.parse(localStorage.getItem("songs") || "[]");
        const foundSong = songs.find((s: Song) => s._id === id);
        setSong(foundSong);
    }, [id]);

    if (!song) return <div>Loading...</div>;

    const handlePlayClick = () => {
        if (currentSong?._id === song._id && isPlaying) {
            pauseSong();
        } else {
            playSong(song);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-start gap-8">
                <div className="w-64 h-64 bg-zinc-800 rounded-lg"></div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold text-white">{song.title}</h1>
                    <p className="text-xl text-zinc-400">{song.artist}</p>
                    <p className="text-zinc-400">{song.album}</p>
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
                </div>
            </div>
        </div>
    );
};

export default SongDetails; 
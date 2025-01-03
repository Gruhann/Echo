import { createContext, useContext, useState, ReactNode } from 'react';

type Song = {
    _id: string;
    title: string;
    artist: string;
    album: string;
    url: string;
};

interface AudioContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    volume: number;
    progress: number;
    playSong: (song: Song) => void;
    pauseSong: () => void;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    setProgress: (progress: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [audio] = useState(new Audio());

    const playSong = (song: Song) => {
        if (currentSong?._id !== song._id) {
            setCurrentSong(song);
            audio.src = song.url;
        }
        audio.play();
        setIsPlaying(true);
    };

    const pauseSong = () => {
        audio.pause();
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (isPlaying) {
            pauseSong();
        } else if (currentSong) {
            playSong(currentSong);
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        audio.volume = newVolume;
        setVolume(newVolume);
    };

    const handleProgressChange = (newProgress: number) => {
        const time = (newProgress / 100) * audio.duration;
        audio.currentTime = time;
        setProgress(newProgress);
    };

    return (
        <AudioContext.Provider
            value={{
                currentSong,
                isPlaying,
                volume,
                progress,
                playSong,
                pauseSong,
                togglePlay,
                setVolume: handleVolumeChange,
                setProgress: handleProgressChange,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
}

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}; 
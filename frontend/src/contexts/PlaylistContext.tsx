import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    url: string;
}

interface Playlist {
    _id: string;
    name: string;
    songs: Song[];
}

interface PlaylistContextType {
    likedSongs: Song[];
    playlists: Playlist[];
    toggleLikedSong: (song: Song) => void;
    createPlaylist: (name: string, songIds: string[]) => Promise<void>;
    addSongToPlaylist: (playlistId: string, song: Song) => Promise<void>;
    isLiked: (songId: string) => boolean;
    fetchLikedSongs: () => Promise<void>;
}

const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [likedSongs, setLikedSongs] = useState<Song[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    // Fetch liked songs and playlists on mount
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const [likedResponse, playlistsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/liked-songs', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:5000/api/playlists', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setLikedSongs(likedResponse.data);
                setPlaylists(playlistsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleLikedSong = async (song: Song) => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (!token) {
            console.error('No token found. User might not be authenticated.');
            return;
        }
        try {
            const isCurrentlyLiked = likedSongs.some(s => s._id === song._id);
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            if (isCurrentlyLiked) {
                console.log(`Removing song with ID: ${song._id}`);
                const response = await axios.delete(`http://localhost:5000/api/liked-songs/${song._id}`, config);
                console.log('Response:', response.data);
                setLikedSongs(prev => prev.filter(s => s._id !== song._id));
            } else {
                console.log(`Adding song with ID: ${song._id}`);
                const response = await axios.post('http://localhost:5000/api/liked-songs', { songId: song._id }, config);
                console.log('Response:', response.data);
                setLikedSongs(prev => [...prev, response.data]);
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error toggling liked song:', axiosError.response ? axiosError.response.data : axiosError.message);
        }
    };

    const createPlaylist = async (name: string, songIds: string[]) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/api/playlists', 
                { name, songs: songIds },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setPlaylists(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    const addSongToPlaylist = async (playlistId: string, song: Song) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`http://localhost:5000/api/playlists/${playlistId}/songs`,
                { songId: song._id },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setPlaylists(prev => prev.map(p => {
                if (p._id === playlistId) {
                    return { ...p, songs: [...p.songs, song] };
                }
                return p;
            }));
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    };

    const isLiked = (songId: string) => likedSongs.some(song => song._id === songId);

    const fetchLikedSongs = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/liked-songs', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLikedSongs(response.data);
        } catch (error) {
            console.error('Error fetching liked songs:', error);
        }
    };

    return (
        <PlaylistContext.Provider value={{
            likedSongs,
            playlists,
            toggleLikedSong,
            createPlaylist,
            addSongToPlaylist,
            isLiked,
            fetchLikedSongs
        }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => {
    const context = useContext(PlaylistContext);
    if (!context) {
        throw new Error('usePlaylist must be used within a PlaylistProvider');
    }
    return context;
}; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { usePlaylist } from '../contexts/PlaylistContext';
import axios from 'axios';

interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
}

const CreatePlaylist = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
    const [playlistName, setPlaylistName] = useState('');
    const [songs, setSongs] = useState<Song[]>([]);
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const { createPlaylist } = usePlaylist();
    const navigate = useNavigate();

    // Fetch songs when component mounts
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/songs');
                setSongs(response.data);
                setFilteredSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
        fetchSongs();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = songs.filter(song => 
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSongs(filtered);
    };

    const toggleSongSelection = (songId: string) => {
        const newSelection = new Set(selectedSongs);
        if (newSelection.has(songId)) {
            newSelection.delete(songId);
        } else {
            newSelection.add(songId);
        }
        setSelectedSongs(newSelection);
    };

    const handleCreatePlaylist = async () => {
        if (!playlistName.trim() || selectedSongs.size === 0) return;
        try {
            await createPlaylist(playlistName, Array.from(selectedSongs));
            navigate('/');
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="New Playlist Name"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="w-full bg-zinc-800 text-white p-3 rounded-lg mb-4"
                />
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search for songs"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full bg-zinc-800 text-white pl-10 p-3 rounded-lg"
                    />
                </div>
            </div>

            <div className="space-y-2">
                {filteredSongs.map(song => (
                    <div
                        key={song._id}
                        className="flex items-center gap-4 p-3 hover:bg-zinc-800/50 rounded-lg group"
                    >
                        <input
                            type="checkbox"
                            checked={selectedSongs.has(song._id)}
                            onChange={() => toggleSongSelection(song._id)}
                            className="w-5 h-5 accent-green-500"
                        />
                        <div className="flex-1">
                            <p className="text-white font-medium">{song.title}</p>
                            <p className="text-sm text-zinc-400">{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleCreatePlaylist}
                disabled={!playlistName.trim() || selectedSongs.size === 0}
                className="fixed bottom-13 right-6 bg-green-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Create Playlist
            </button>
        </div>
    );
};

export default CreatePlaylist; 
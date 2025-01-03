import { usePlaylist } from '../contexts/PlaylistContext';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Playlists = () => {
    const { playlists } = usePlaylist(); // Get playlists from context
    const navigate = useNavigate(); // Initialize navigate

    return (
        <div className="p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-white">Your Playlists</h1>
                <button
                    onClick={() => navigate('/create-playlist')}
                    className="bg-green-500 text-black rounded-full p-1  hover:bg-green-600"
                >
                    <Plus size={32} className="inline " />
                </button>
            </div>
            <div className="space-y-2">
                {playlists.map(playlist => (
                    <div
                        key={playlist._id}
                        className="flex items-center gap-4 p-3 hover:bg-zinc-800/50 rounded-lg cursor-pointer"
                        onClick={() => navigate(`/playlists/${playlist._id}`)} // Navigate to playlist details
                    >
                        <div className="bg-gradient-to-br from-purple-700 to-blue-300 p-4 rounded-md">
                            <span className="text-white">{playlist.name.charAt(0)}</span> {/* Placeholder for playlist icon */}
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium">{playlist.name}</p>
                            <p className="text-sm text-zinc-400">{playlist.songs.length} songs</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Playlists; 
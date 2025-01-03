import { useEffect } from 'react';
import { usePlaylist } from '../contexts/PlaylistContext';
import SongList from '../layout/SongList';
import { Heart } from 'lucide-react';

const LikedSongs = () => {
    const { likedSongs, fetchLikedSongs } = usePlaylist();

    useEffect(() => {
        fetchLikedSongs();
    }, [fetchLikedSongs]);

    return (
        <div className="p-6">
            <div className="flex items-center gap-6 mb-6">
                <div className="bg-gradient-to-br from-purple-700 to-blue-300 p-8 rounded-lg">
                    <Heart size={32} className="text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Liked Songs</h1>
                    <p className="text-zinc-400">{likedSongs.length} songs</p>
                </div>
            </div>
            <SongList songs={likedSongs} />
        </div>
    );
};

export default LikedSongs; 
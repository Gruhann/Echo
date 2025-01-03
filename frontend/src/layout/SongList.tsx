import { Play, Pause, MoreHorizontal } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";

type Song = {
    _id: string;
    title: string;
    artist: string;
    album: string;
    url: string;
};

type SongListProps = {
    songs: Song[];
};

const SongList: React.FC<SongListProps> = ({ songs }) => {
    const { currentSong, isPlaying, playSong, pauseSong } = useAudio();

    const handlePlayClick = (song: Song) => {
        if (currentSong?._id === song._id && isPlaying) {
            pauseSong();
        } else {
            playSong(song);
        }
    };

    return (
        <div className="mt-6">
            <div className="flex flex-col">
                <div className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-6 py-2 text-zinc-400 text-sm border-b border-zinc-800">
                    <div>#</div>
                    <div>Title</div>
                    <div>Album</div>
                    <div>Duration</div>
                </div>
                {songs.map((song, index) => (
                    <div 
                        key={song._id}
                        className={`grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 px-6 py-2 text-zinc-400 hover:bg-zinc-800/50 rounded-lg group ${
                            currentSong?._id === song._id ? 'bg-zinc-800/50' : ''
                        }`}
                    >
                        <div className="flex items-center">
                            <span className="group-hover:hidden">
                                {currentSong?._id === song._id && isPlaying ? (
                                    <span className="text-green-500">♪</span>
                                ) : (
                                    index + 1
                                )}
                            </span>
                            <button 
                                className="hidden group-hover:block"
                                onClick={() => handlePlayClick(song)}
                            >
                                {currentSong?._id === song._id && isPlaying ? (
                                    <Pause size={14} className="text-white" />
                                ) : (
                                    <Play size={14} className="text-white" />
                                )}
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-zinc-800 rounded"></div>
                            <div>
                                <p className={`${
                                    currentSong?._id === song._id ? 'text-green-500' : 'text-white'
                                }`}>
                                    {song.title}
                                </p>
                                <p className="text-sm">{song.artist}</p>
                            </div>
                        </div>
                        <div className="flex items-center">{song.album}</div>
                        <div className="flex items-center justify-between">
                            <span>3:30</span>
                            <button className="invisible group-hover:visible">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SongList; 
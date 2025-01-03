import { Link, useNavigate } from "react-router-dom";
import { Home, Library, Search, Plus, Heart, Play, Pause, SkipBack, SkipForward, Volume2, UserCircle } from "lucide-react";
import { useAudio } from "../contexts/AudioContext";
import { useState, useEffect } from "react";
import { usePlaylist } from '../contexts/PlaylistContext';

const MainLayout: React.FC<{ 
    children: React.ReactNode;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}> = ({ children, searchQuery, setSearchQuery }) => {
    const { currentSong, isPlaying, togglePlay, volume, setVolume } = useAudio();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState<{ name: string } | null>(null);
    const {  likedSongs } = usePlaylist();
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
    };

    const handleSwitchAccount = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
    };

    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Mobile Header */}
            <div className="md:hidden bg-zinc-900 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-white">
                        Hi, {user?.name || 'there'}!
                    </h1>
                    <button 
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded-full"
                    >
                        <UserCircle size={20} />
                    </button>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search songs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-zinc-800 text-white p-2 rounded-md flex-1"
                    />
                </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block fixed top-0 right-0 p-4 z-50">
                <div className="relative">
                    <button 
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full"
                    >
                        <UserCircle size={20} />
                        <span>{user?.name || "User"}</span>
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg py-1">
                            <button
                                onClick={() => navigate("/profile")}
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
                            >
                                Profile
                            </button>
                            <button
                                onClick={handleSwitchAccount}
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
                            >
                                Switch Account
                            </button>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 gap-2 p-2 pt-2">
                {/* Sidebar - Hidden on Mobile */}
                <div className="hidden md:flex flex-col gap-2 w-[300px]">
                    <div className="bg-zinc-900 rounded-lg p-4">
                        <Link 
                            to="/" 
                            className="flex items-center gap-4 text-zinc-400 hover:text-white transition"
                            onClick={() => setSearchQuery("")}
                        >
                            <Home size={24} />
                            <span className="font-semibold">Home</span>
                        </Link>
                        <Link 
                            to="/search" 
                            className="flex items-center gap-4 text-zinc-400 hover:text-white transition mt-4"
                        >
                            <Search size={30} />
                            <input
                                type="text"
                                placeholder="Search songs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-zinc-800 text-white p-2 pl-4 rounded-full w-full"
                            />
                        </Link>
                    </div>

                    {/* Library */}
                    <div className="bg-zinc-900 rounded-lg flex-1 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-zinc-400 hover:text-white transition">
                                <Library size={24} />
                                <span className="font-semibold">Your Library</span>
                            </div>
                            <div className="relative">
                                <button 
                                    className="p-2 hover:bg-zinc-800 rounded-full"
                                    onClick={() => navigate('/create-playlist')}
                                >
                                    <Plus size={20} className="text-zinc-400 hover:text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Playlists Button */}
                        <div 
                            className="mt-4 flex items-center gap-4 hover:bg-zinc-800 p-2 rounded-md transition cursor-pointer"
                            onClick={() => navigate('/playlists')}
                        >
                            <div className="bg-gradient-to-br from-purple-700 to-blue-300 p-4 rounded-md">
                                <Library size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-white font-semibold">Playlists</p>
                            </div>
                        </div>

                        {/* Liked Songs */}
                        <div className="mt-4">
                            <div className="flex flex-col gap-4">
                                <div 
                                    className="flex items-center gap-4 hover:bg-zinc-800 p-2 rounded-md transition cursor-pointer"
                                    onClick={() => navigate('/liked-songs')}
                                >
                                    <div className="bg-gradient-to-br from-purple-700 to-blue-300 p-4 rounded-md">
                                        <Heart size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">Liked Songs</p>
                                        <p className="text-zinc-400 text-sm">{likedSongs.length} songs</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area with Bottom Padding for Player + Navbar */}
                <div className="flex-1 overflow-y-auto pb-[146px]"> {/* 90px + 56px */}
                    <div className="bg-gradient-to-b rounded-lg from-emerald-800 p-6 hidden md:block">
                        <h1 className="text-3xl font-bold text-white">
                            Hi, {user?.name || 'there'}!
                        </h1>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>

                </div>
            </div>

            {/* Player Controls */}
            <div className="md:h-[90px] h-[70px] bg-zinc-900 border-t rounded-full border-zinc-800 p-3 m-3 mb-4 fixed bottom-[56px] md:bottom-0 left-0 right-0">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Currently Playing */}
                    <div className="flex items-center gap-4 min-w-[180px] md:min-w-[240px]">
                        <div className="w-[40px] h-[40px] md:w-[56px] md:h-[56px] bg-zinc-800 rounded-md flex-shrink-0"></div>
                        <div className="truncate">
                            <p className="text-white font-semibold text-sm md:text-base truncate">
                                {currentSong ? currentSong.title : 'No song playing'}
                            </p>
                            <p className="text-zinc-400 text-xs md:text-sm truncate">
                                {currentSong ? currentSong.artist : 'Select a song to play'}
                            </p>
                        </div>
                    </div>

                    {/* Center Controls */}
                    <div className="flex flex-col items-center gap-2 flex-1 max-w-[600px] md:max-w-[800px] px-4">
                        <div className="flex items-center gap-4">
                            <button className="hidden md:flex items-center justify-center text-zinc-400 hover:text-white transition">
                                <SkipBack size={20} />
                            </button>
                            <button 
                                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition"
                                onClick={togglePlay}
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                            </button>
                            <button className="hidden md:flex items-center justify-center text-zinc-400 hover:text-white transition">
                                <SkipForward size={20} />
                            </button>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full flex items-center gap-2 text-xs text-zinc-400">
                            <span className="hidden md:block">0:00</span>
                            <div className="flex-1 h-1 bg-zinc-800 rounded-full group cursor-pointer">
                                <div 
                                    className="h-full bg-white group-hover:bg-green-500 rounded-full relative"
                                    style={{ width: '30%' }}
                                >
                                    <div className="hidden group-hover:block w-3 h-3 bg-white absolute right-0 -top-1 rounded-full"></div>
                                </div>
                            </div>
                            <span className="hidden md:block">3:30</span>
                        </div>
                    </div>

                    {/* Volume Control */}
                    <div className="hidden md:flex items-center gap-2 min-w-[180px] justify-end">
                        <Volume2 size={20} className="text-zinc-400" />
                        <div 
                            className="w-[100px] h-1 bg-zinc-800 rounded-full cursor-pointer group"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const newVolume = (e.clientX - rect.left) / rect.width;
                                setVolume(Math.max(0, Math.min(1, newVolume)));
                            }}
                            onMouseMove={(e) => {
                                if (e.buttons === 1) { // Left mouse button is pressed
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const newVolume = (e.clientX - rect.left) / rect.width;
                                    setVolume(Math.max(0, Math.min(1, newVolume)));
                                }
                            }}
                        >
                            <div 
                                className="h-full bg-white group-hover:bg-green-500 rounded-full relative"
                                style={{ width: `${volume * 100}%` }}
                            >
                                <div className="hidden group-hover:block w-3 h-3 bg-white absolute right-0 -top-1 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-[56px] bg-zinc-900 border-t border-zinc-800">
                <div className="flex justify-around items-center h-full px-4">
                    <Link to="/" onClick={() => setSearchQuery("")} className="text-zinc-400 hover:text-white">
                        <Home size={24} />
                    </Link>
                    <Link to="/search" className="text-zinc-400 hover:text-white">
                        <Search size={24} />
                    </Link>
                    <Link to="/library" className="text-zinc-400 hover:text-white">
                        <Library size={24} />
                    </Link>
                </div>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
                <div className="absolute right-4 top-16 w-48 bg-zinc-800 rounded-md shadow-lg py-1 z-50">
                    <button
                        onClick={() => {
                            navigate("/profile");
                            setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
                    >
                        Profile
                    </button>
                    <button
                        onClick={handleSwitchAccount}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
                    >
                        Switch Account
                    </button>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
                    >
                        Logout
                    </button>
                </div>
            )}
            
        </div>
    );
};

export default MainLayout; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SongList from "./layout/SongList";
import MainLayout from "./layout/MainLayout";
import { AudioProvider } from "./contexts/AudioContext";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Profile from "./components/Profile";
import SongDetails from "./components/SongDetails";
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import axios from "axios";

interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    url: string;
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token);
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchSongs = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get("http://localhost:5000/api/songs", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setSongs(response.data);
                    setFilteredSongs(response.data);
                } catch (error) {
                    console.error("Error fetching songs:", error);
                }
            };
            fetchSongs();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = songs.filter(song => 
                song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(songs);
        }
    }, [searchQuery, songs]);

    return (
        <AudioProvider>
            <Router>
                <Toaster position="top-right" />
                <Routes>
                    <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
                    <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" />} />
                    <Route
                        path="/*"
                        element={
                            isAuthenticated ? (
                                <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
                                    <Routes>
                                        <Route path="/" element={<SongList songs={filteredSongs} />} />
                                        <Route path="/search" element={<SongList songs={filteredSongs} />} />
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/song/:id" element={<SongDetails />} />
                                        <Route path="/library" element={<div>Your Library</div>} />
                                    </Routes>
                                </MainLayout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </Router>
        </AudioProvider>
    );
}

export default App;

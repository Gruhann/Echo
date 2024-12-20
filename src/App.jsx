import { useState } from 'react';
import { FaHome, FaSearch, FaBook, FaPlus, FaHeart, FaDownload, FaBars } from 'react-icons/fa';
import { RiSpotifyFill } from 'react-icons/ri';
import './index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar - Added z-index and overlay */}
      <div className={`md:hidden fixed inset-0 bg-black/50 z-20 ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar}></div>
      <aside className={`fixed inset-y-0 left-0 bg-[#121212] p-6 flex flex-col z-30 w-64 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center gap-2 mb-8">
          <RiSpotifyFill className="text-3xl text-blue-500" aria-label="Spotify Icon" />
          <span className="text-white text-xl font-bold">Echo</span>
        </div>

        {/* Navigation Menu with tooltips */}
        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors rounded-lg p-2" aria-label="Home">
            <FaHome className="text-2xl" />
            <span className="font-medium">Home</span>
          </a>
          <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors rounded-lg p-2" aria-label="Search">
            <FaSearch className="text-2xl" />
            <span className="font-medium">Search</span>
          </a>
          <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors rounded-lg p-2" aria-label="Your Library">
            <FaBook className="text-2xl" />
            <span className="font-medium">Your Library</span>
          </a>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors rounded-lg p-2">
              <div className="p-1 bg-gray-300 rounded-full group-hover:bg-white">
                <FaPlus className="text-black text-sm" />
              </div>
              <span className="font-medium">Create Playlist</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors rounded-lg p-2">
              <div className="p-1 bg-gradient-to-br from-purple-700 to-blue-300 rounded-full">
                <FaHeart className="text-white text-sm" />
              </div>
              <span className="font-medium">Liked Songs</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors rounded-lg p-2">
              <div className="p-1 bg-gradient-to-brounded-full">
                <FaDownload className="text-white text-sm" />
              </div>
              <span className="font-medium">Downloads</span>
            </a>
          </div>
        </nav>

        {/* Updated Close Button for mobile */}
        <button 
          className="md:hidden absolute top-4 right-4 p-2 text-white hover:bg-[#282828] rounded-full" 
          onClick={toggleSidebar} 
          aria-label="Close Sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </aside>

      {/* Updated Toggle Button - Added better positioning */}
      <button 
        className="fixed top-4 left-4 z-20 p-2 bg-[#282828] rounded-full" 
        onClick={toggleSidebar} 
        aria-label="Toggle Sidebar"
      >
        <FaBars className="text-white text-xl" />
      </button>

      {/* Main Content with improved accessibility */}
      <main className={`flex-1 overflow-y-auto scroll-smooth bg-gradient-to-b from-[#1e1e1e] to-[#121212] md:ml-64 transition-all duration-300 ease-in-out`}>
        {/* Header - Make it sticky with proper z-index */}
        <header className="sticky top-0 bg-[#121212]/75 backdrop-blur-md z-10 p-4 rounded-b-lg">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto">
            <div className="flex gap-2">
              <button className="rounded-full ml-12 bg-black/40 p-1 hover:bg-black/60" aria-label="Previous">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="rounded-full bg-black/40 p-1 hover:bg-black/60" aria-label="Next">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-white bg-black/30 hover:bg-black/40 py-2 px-4 rounded-full text-sm font-medium">
                Sign up
              </button>
              <button className="text-black bg-white hover:bg-gray-100 py-2 px-4 rounded-full text-sm font-medium">
                Log in
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl text-white font-bold mb-4">Good afternoon</h2>
          
          {/* Featured Playlists Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex items-center bg-[#282828] hover:bg-[#3e3e3e] rounded-lg overflow-hidden cursor-pointer group">
                <img 
                  src={`https://picsum.photos/seed/${item}/80/80`} 
                  alt="Playlist cover" 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <span className="text-white font-bold p-4">Playlist {item}</span>
              </div>
            ))}
          </div>

          {/* Made for you Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-white font-bold">Made for you</h2>
              <button className="text-gray-400 hover:text-white text-sm font-bold">Show all</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="p-4 bg-[#181818] hover:bg-[#282828] rounded-lg transition-colors group">
                  <div className="relative mb-4">
                    <img 
                      src={`https://picsum.photos/seed/${item + 10}/160/160`}
                      alt="Album cover"
                      className="w-full aspect-square object-cover rounded-lg shadow-lg"
                    />
                    <button className="absolute bottom-2 right-2 p-3 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-white font-bold mb-2">Daily Mix {item}</h3>
                  <p className="text-gray-400 text-sm">Custom mix of music you like</p>
                </div>
              ))}
            </div>
          </section>

          {/* Top Artists Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-white font-bold">Top Artists</h2>
              <button className="text-gray-400 hover:text-white text-sm font-bold">Show all</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="p-4 bg-[#181818] hover:bg-[#282828] rounded-lg transition-colors group">
                  <div className="relative mb-4">
                    <img 
                      src={`https://picsum.photos/seed/${item + 20}/160/160`}
                      alt="Artist cover"
                      className="w-full aspect-square object-cover rounded-lg shadow-lg"
                    />
                    <button className="absolute bottom-2 right-2 p-3 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-white font-bold mb-2">Artist {item}</h3>
                  <p className="text-gray-400 text-sm">Top tracks and albums</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;

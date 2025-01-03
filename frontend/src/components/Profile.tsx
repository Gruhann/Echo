import { useEffect, useState } from 'react';

interface User {
    name: string;
    email: string;
}

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
            <div className="bg-zinc-800 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-24 h-24 bg-zinc-700 rounded-full flex items-center justify-center">
                        <span className="text-3xl text-white">{user?.name?.[0]}</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                        <p className="text-zinc-400">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 
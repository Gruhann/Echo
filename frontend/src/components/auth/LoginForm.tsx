import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            toast.success(`Welcome back, ${response.data.user.name}!`);
            console.log("Login successful:", response.data.user.email);
            
            navigate("/");
            window.location.reload();
            
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage = error.response?.data?.message || "An error occurred";
            setError(errorMessage);
            toast.error(errorMessage);
            console.error("Login failed:", errorMessage);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <div className="w-full max-w-md space-y-8 bg-zinc-900 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-white text-center">Login to Spotify</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-3 rounded bg-zinc-800 text-white"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 rounded bg-zinc-800 text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-green-500 text-white font-semibold hover:bg-green-600"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-zinc-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-500 hover:text-green-400">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm; 
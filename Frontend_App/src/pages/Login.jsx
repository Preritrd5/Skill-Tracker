import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login, loading, error, clearError } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError("");
        clearError && clearError();

        if (!email || !password) {
            setLocalError("Please enter email and password.");
            return;
        }

        const res = await login({ email, password });
        if (res.ok) {
            navigate("/dashboard");
        } else {
            setLocalError(res.error || "Login failed");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-[linear-gradient(135deg,hsl(195,100%,95%),hsl(195,100%,88%))]">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">
                {}
                <h2 className="text-3xl font-bold text-center text-gray-900">Welcome Back 👋</h2>
                <p className="text-center text-gray-600 mt-2">Login to continue your learning journey</p>

                {}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {(localError || error) && <div className="text-sm text-red-600">{localError || error}</div>}

                    {}
                    <div>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    </div>

                    {}
                    <div>
                        <label className="text-gray-700 font-medium">Password</label>

                        <div className="flex items-center mt-1 border rounded-md px-3">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full py-2 outline-none"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-sm text-blue-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 text-lg font-medium text-white rounded-lg 
              bg-[linear-gradient(135deg,hsl(195,100%,45%),hsl(195,100%,60%))] 
              hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {}
                <p className="text-center text-gray-600 mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>
                <p className="text-center text-gray-600 mt-6 text-sm">
                    Back to Home Page?{" "}
                    <Link to="/" className="text-blue-600 font-medium hover:underline">
                        Home
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;

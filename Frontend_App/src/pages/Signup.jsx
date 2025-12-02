import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const navigate = useNavigate();
    const { signup, loading, error, clearError } = useAuth();

    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });

    const [localError, setLocalError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError("");
        clearError && clearError();

        const { name, email, password, confirm } = form;
        if (!name.trim() || !email.trim() || !password) {
            setLocalError("Please fill all required fields.");
            return;
        }
        if (password !== confirm) {
            setLocalError("Passwords do not match.");
            return;
        }

        const res = await signup({ name: name.trim(), email: email.trim(), password });
        if (res.ok) {
            setMessage("Registered Successfully!");
            setForm({
                name: "",
                email: "",
                password: "",
                confirm: "",
            });
        } else {
            setLocalError(res.error || "Signup failed");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-[linear-gradient(135deg,hsl(195,100%,95%),hsl(195,100%,88%))]">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">
                {}
                <h2 className="text-3xl font-bold text-center text-gray-900">Create Account ✨</h2>
                <p className="text-center text-gray-600 mt-2">Start tracking your learning journey</p>

                {message && (
                    <div className="mt-4 p-3 rounded-md bg-green-100 text-green-800 border border-green-300 text-center shadow-md">
                        {message}
                    </div>
                )}

                {}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {(localError || error) && <div className="text-sm text-red-600">{localError || error}</div>}

                    {}
                    <div>
                        <label className="text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    </div>

                    {}
                    <div>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@email.com"
                            value={form.email}
                            onChange={handleChange}
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
                                name="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full py-2 outline-none"
                                required
                            />
                            <button
                                type="button"
                                className="text-sm text-blue-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {}
                    <div>
                        <label className="text-gray-700 font-medium">Confirm Password</label>
                        <div className="flex items-center mt-1 border rounded-md px-3">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirm"
                                placeholder="••••••••"
                                value={form.confirm}
                                onChange={handleChange}
                                className="w-full py-2 outline-none"
                                required
                            />
                            <button
                                type="button"
                                className="text-sm text-blue-600"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 text-lg font-medium text-white rounded-lg bg-[linear-gradient(135deg,hsl(195,100%,45%),hsl(195,100%,60%))] hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                {}
                <p className="text-center text-gray-600 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login
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

export default Signup;

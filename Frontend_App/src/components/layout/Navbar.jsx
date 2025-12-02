import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth("");
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="sticky top-0 bg-[#33cbfd] flex items-center justify-between px-4 py-3 shadow-lg z-40">
            <div className="flex items-center gap-3 ml-[30px]">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/skill_logo.png" alt="" className="w-[50px] h-[50px] rounded" />
                    <span className="text-white text-2xl font-semibold tracking-wide">Skill Tracker</span>
                </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
                {user && (
                    <>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center h-12 px-5 rounded-lg bg-blue-400 bg-opacity-30 text-white hover:bg-orange-400 hover:text-white text-lg font-semibold transition"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/skills"
                            className="inline-flex items-center h-12 px-5 rounded-lg bg-blue-400 bg-opacity-30 text-white hover:bg-orange-400 hover:text-white text-lg font-semibold transition"
                        >
                            Skills
                        </Link>

                        <Link
                            to="/analytics"
                            className="inline-flex items-center h-12 px-5 rounded-lg bg-blue-400 bg-opacity-30 text-white hover:bg-orange-400 hover:text-white text-lg font-semibold transition"
                        >
                            Analytics
                        </Link>
                    </>
                )}
            </nav>

            <div className="hidden md:flex items-center gap-4 mr-[30px]">
                {!user ? (
                    <>
                        <Link to="/login" className="px-3 py-2 rounded-md bg-white/20 text-lg font-semibold text-white hover:bg-blue-100 hover:text-teal-400">Login</Link>
                        <Link to="/signup" className="px-3 py-2 rounded-md bg-white text-teal-600 font-medium hover:bg-orange-300 hover:text-white">Sign up</Link>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="w-[47px] h-[47px] rounded-full border-2 border-white overflow-hidden" title={user.name || user.email}>
                            <Link to="/profile">
                                <img
                                    src="/user.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover cursor-pointer"
                                />
                            </Link>

                        </div>

                        <div className="text-white text-sm">
                            <div className="font-medium">{user.name || user.email}</div>
                            <div className="text-xs opacity-80">{user.email}</div>
                        </div>

                        <button onClick={handleLogout} className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-400">Logout</button>
                    </div>
                )}
            </div>

            <button
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white/90"
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {open ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {open && (
                <div className="absolute top-full left-0 w-full bg-white/5 backdrop-blur-md md:hidden p-4 z-30">
                    <div className="flex flex-col gap-2">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="inline-flex items-center h-12 px-5 rounded-lg hover:bg-orange-400 hover:text-white bg-blue-400 text-white text-lg font-semibold transition">Dashboard</Link>
                                <Link to="/skills" className="inline-flex items-center h-12 px-5 rounded-lg hover:bg-orange-400 hover:text-white bg-blue-400 text-white text-lg font-semibold transition">Skills</Link>
                                <Link to="/analytics" className="inline-flex items-center h-12 px-5 rounded-lg hover:bg-orange-400 hover:text-white bg-blue-400 text-white text-lg font-semibold transition">Analytics</Link>

                                <div class="border-t border-white/10 bg-blue-400 mt-3 py-2 rounded-lg px-4 hover:bg-orange-400 cursor-pointer flex items-center justify-between">
                                    <div className="flex items-center gap-3 ">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 ">
                                            { }
                                            <img src="/user.png" alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="text-white">
                                            <div className="font-medium">{user.name || user.email}</div>
                                            <div className="text-xs opacity-80">{user.email}</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setOpen(false);
                                            handleLogout();
                                        }}
                                        className="py-2 px-3 rounded bg-red-500 text-white"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setOpen(false)} className="py-2 px-3 rounded hover:bg-orange-400 hover:text-white bg-blue-400 text-white text-lg font-semibold text-center">Login</Link>
                                <Link to="/signup" onClick={() => setOpen(false)} className="py-2 px-3 rounded hover:bg-orange-400 hover:text-white bg-blue-400 text-white  text-lg font-semibold text-center">Sign up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

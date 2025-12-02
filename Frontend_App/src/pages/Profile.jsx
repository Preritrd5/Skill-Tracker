import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Profile = () => {
    const { user, setUser, logout } = useAuth();
    const navigate = useNavigate();

    const initial = {
        name: user?.name || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
        location: user?.location || "",
        bio: user?.bio || "",
    };

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState(initial);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });

    function handleChange(e) {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    }

    function handlePasswordChange(e) {
        setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));
    }

    function isValidMobile(m) {
        if (!m) return true; 
        
        const cleaned = m.replace(/[\s()-]/g, "");
        return /^(\+)?[0-9]{7,15}$/.test(cleaned);
    }

    async function handleSave(e) {
        e.preventDefault();
        setMessage("");
        setError("");

        
        if (!form.name || !form.name.trim()) {
            setError("Name is required.");
            return;
        }
        if (!form.email || !form.email.includes("@")) {
            setError("Valid email is required.");
            return;
        }
        if (!isValidMobile(form.mobile)) {
            setError("Enter a valid mobile number (digits, optional leading +).");
            return;
        }
        if (showPasswordFields) {
            if (!passwords.newPass) {
                setError("New password is required when changing password.");
                return;
            }
            if (passwords.newPass.length < 6) {
                setError("Password must be at least 6 characters.");
                return;
            }
            if (passwords.newPass !== passwords.confirm) {
                setError("Password confirmation does not match.");
                return;
            }
        }

        setLoading(true);

        try {
            const payload = {
                name: form.name,
                email: form.email,
                mobile: form.mobile || null,
                location: form.location || null,
                bio: form.bio || null,
            };
            if (showPasswordFields && passwords.newPass) {
                
                payload.password = passwords.newPass;
                payload.currentPassword = passwords.current || undefined;
            }

            const res = await api.updateProfile(payload);

            if (!res) throw new Error("Empty response from server");
            if (res.message) throw new Error(res.message);

            const updatedUser = res.user || res;
            if (setUser) setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            setMessage("Profile updated!");
            setEditing(false);
            setShowPasswordFields(false);
            setPasswords({ current: "", newPass: "", confirm: "" });
        } catch (err) {
            console.error("Profile save error:", err);
            setError(err?.message || "Failed to save");
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        logout && logout();
        navigate("/login");
    }

    if (!user) {
        return (
            <main className="relative flex items-center justify-center min-h-[80vh] px-6">
                <div className="absolute top-10 left-10 w-40 h-40 bg-blue-300/40 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-10 right-10 w-52 h-52 bg-purple-300/40 rounded-full blur-3xl -z-10" />

                <div className="bg-white/70 backdrop-blur-xl rounded-xl p-10 shadow-xl text-center">
                    <p className="text-gray-700 text-lg">You are not logged in.</p>
                    <Link to="/login" className="text-blue-600 underline mt-4 block">
                        Login
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="relative px-4 py-16 min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-blue-100">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl -z-10" />

            <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
                        <p className="text-gray-500 mt-1 text-sm">Manage your account information</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setEditing((s) => {
                                    if (!s) setForm({ name: user?.name || "", email: user?.email || "", mobile: user?.mobile || "", location: user?.location || "", bio: user?.bio || "" });
                                    setMessage("");
                                    setError("");
                                    return !s;
                                });
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            {editing ? "Cancel" : "Edit"}
                        </button>

                        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>

                <form onSubmit={handleSave} className="mt-10 space-y-6">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Name</label>
                        <input name="name" value={form.name} onChange={handleChange} disabled={!editing || loading} className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none transition ${editing ? "bg-white" : "bg-gray-100"}`} />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input name="email" value={form.email} onChange={handleChange} disabled={!editing || loading} className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none transition ${editing ? "bg-white" : "bg-gray-100"}`} />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Mobile (optional)</label>
                        <input name="mobile" value={form.mobile} onChange={handleChange} disabled={!editing || loading} placeholder="+911234567890" className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none transition ${editing ? "bg-white" : "bg-gray-100"}`} />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Location (optional)</label>
                        <input name="location" value={form.location} onChange={handleChange} disabled={!editing || loading} placeholder="City, Country" className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none transition ${editing ? "bg-white" : "bg-gray-100"}`} />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Bio (optional)</label>
                        <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} disabled={!editing || loading} className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none transition ${editing ? "bg-white" : "bg-gray-100"}`} />
                    </div>

                    {}
                    <div>
                        <label className="inline-flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={showPasswordFields} onChange={() => setShowPasswordFields((v) => !v)} disabled={!editing || loading} />
                            <span>Change password</span>
                        </label>
                    </div>

                    {showPasswordFields && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Current password (optional)</label>
                                <input name="current" type="password" value={passwords.current} onChange={handlePasswordChange} disabled={!editing || loading} className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">New password</label>
                                <input name="newPass" type="password" value={passwords.newPass} onChange={handlePasswordChange} disabled={!editing || loading} className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Confirm new</label>
                                <input name="confirm" type="password" value={passwords.confirm} onChange={handlePasswordChange} disabled={!editing || loading} className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none" />
                            </div>
                        </div>
                    )}

                    {editing && (
                        <div className="flex justify-end">
                            <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition shadow-md">
                                {loading ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    )}

                    {message && <p className="text-sm text-green-600 text-center mt-2 animate-fade-in">{message}</p>}
                    {error && <p className="text-sm text-red-600 text-center mt-2 animate-fade-in">{error}</p>}

                    <p className="text-center text-gray-600 mt-6 text-sm">
                        Back to Home Page? <Link to="/" className="text-blue-600 font-medium hover:underline">Home</Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Profile;

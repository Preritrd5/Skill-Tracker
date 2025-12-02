import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Loading from '../components/Loading';

import SkillCard from "../components/SkillCard";
import StatCard from "../components/StatCard"; 

const Dashboard = ({ userNameProp }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const userDisplayName = userNameProp || (user && (user.name || user.email)) || "User";

    
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");

    
    const [showAdd, setShowAdd] = useState(false);
    const [newSkill, setNewSkill] = useState({
        name: "",
        level: "Beginner",
        targetHours: 10,
        targetDate: "",
    });
    const [savingNew, setSavingNew] = useState(false);

    
    const loadSkills = async () => {
        if (!user) return;
        setLoading(true);
        setError("");
        try {
            const res = await api.getSkills(); 
            if (!res) {
                setSkills([]);
                setError("Empty response from server");
            } else if (res.message) {
                setSkills([]);
                setError(res.message);
            } else if (Array.isArray(res)) {
                setSkills(res);
            } else if (res.skills && Array.isArray(res.skills)) {
                setSkills(res.skills);
            } else {
                setSkills([]);
            }
        } catch (err) {
            console.error("Dashboard.loadSkills error:", err);
            setError(err?.message || "Failed to load skills");
            setSkills([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;
        loadSkills();
        
    }, [user]);

    
    const totals = useMemo(() => {
        const totalSkills = skills.length;
        const totalHours = skills.reduce((acc, s) => acc + Number(s.totalHours ?? s.hours ?? 0), 0);
        const milestones = Math.max(0, Math.floor(totalHours / 50));
        return { totalSkills, totalHours, milestones };
    }, [skills]);

    
    const filtered = skills.filter((s) => {
        if (!s) return false;
        if (filter !== "all" && s.level !== filter) return false;
        if (query && !(s.name || "").toLowerCase().includes(query.toLowerCase())) return false;
        return true;
    });

    
    const handleAddSkill = async (e) => {
        e.preventDefault();
        setError("");
        if (!newSkill.name || !newSkill.name.trim()) {
            setError("Skill name is required.");
            return;
        }

        setSavingNew(true);
        try {
            const payload = {
                name: newSkill.name.trim(),
                level: newSkill.level,
                targetHours: newSkill.targetHours ? Number(newSkill.targetHours) : null,
                targetDate: newSkill.targetDate || null,
                notes: null,
            };
            const res = await api.createSkill(payload); 
            if (!res || res.message) {
                throw new Error(res?.message || "Failed to create skill");
            }
            const created = res.skill || res;
            
            setSkills((prev) => [created, ...prev]);
            setNewSkill({ name: "", level: "Beginner", targetHours: 10, targetDate: "" });
            setShowAdd(false);
        } catch (err) {
            console.error("handleAddSkill:", err);
            setError(err?.message || "Failed to add skill");
        } finally {
            setSavingNew(false);
        }
    };

    
    const handleQuickLog = async (skill) => {
        try {
            if (!skill || !(skill._id || skill.id)) {
                alert("Skill not saved to server yet. Use View to open details.");
                return;
            }
            
            const payload = { hours: 1, date: new Date().toISOString().slice(0, 10), notes: "Quick log" };
            const res = await api.addSession(skill._id || skill.id, payload); 
            if (!res || res.message) {
                throw new Error(res?.message || "Failed to log session");
            }
            
            
            await loadSkills();
            navigate(`/skills/${id}`);
        } catch (err) {
            console.error("handleQuickLog:", err);
            alert(err?.message || "Failed to log session");
        }
    };

    const handleView = (skill) => {
        const id = skill._id || skill.id;
        if (id) navigate(`/skills/${id}`);
        else alert("Skill not yet saved. Please add it first.");
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-10 bg-[#FFF6EF] min-h-screen">
            {}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userDisplayName} 👋</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Pick up where you left off — track progress and log sessions.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAdd(true)}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500"
                    >
                        + Add Skill
                    </button>

                    <button
                        onClick={() => loadSkills()}
                        className="inline-flex items-center gap-2 bg-white border hover:bg-orange-400 hover:text-white font-semibold px-3 py-2 rounded-lg hover:bg-gray-50"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <StatCard title="Total Skills" value={totals.totalSkills} variant="orange" />
                <StatCard title="Total Hours" value={`${totals.totalHours} hrs`} variant="blue" />
                <StatCard title="Milestones" value={totals.milestones} variant="default" />
            </div>

            {}
            <div className="mt-6 flex items-center gap-3">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search skills..."
                    className="flex-1 px-3 py-2 border rounded"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 border rounded"
                >
                    <option value="all">All levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            {}
            {loading && (
                <div className="text-center py-10 text-gray-600"> <Loading /> </div>
            )}
            {error && (
                <div className="text-center py-6 text-red-600">{error}</div>
            )}

            {}
            <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length ? (
                    filtered.map((s) => (
                        <SkillCard
                            key={s._id || s.id}
                            skill={{
                                id: s._id || s.id,
                                name: s.name,
                                level: s.level,
                                hours: Number(s.totalHours ?? s.hours ?? 0),
                                targetHours: s.targetHours,
                                targetDate: s.targetDate ? (typeof s.targetDate === "string" ? s.targetDate : (s.targetDate.slice ? s.targetDate.slice(0, 10) : new Date(s.targetDate).toISOString().slice(0, 10))) : "—",
                            }}
                            onLog={() => handleQuickLog(s)}
                            onView={() => handleView(s)}
                        />
                    ))
                ) : (
                    !loading && (
                        <div className="col-span-full text-center text-gray-500 py-8 bg-white/60 rounded">
                            No skills found. Add your first skill.
                        </div>
                    )
                )}
            </section>

            {}
            {showAdd && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowAdd(false);
                    }}
                >
                    <form
                        onSubmit={handleAddSkill}
                        className="bg-white w-full max-w-xl rounded-lg p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold text-gray-900">Add a new skill</h2>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <label className="flex flex-col">
                                <span className="text-sm text-gray-600 mb-1">Skill name</span>
                                <input
                                    autoFocus
                                    required
                                    value={newSkill.name}
                                    onChange={(e) =>
                                        setNewSkill((p) => ({ ...p, name: e.target.value }))
                                    }
                                    className="px-3 py-2 border rounded"
                                    placeholder="e.g., Python"
                                />
                            </label>

                            <label className="flex flex-col">
                                <span className="text-sm text-gray-600 mb-1">Level</span>
                                <select
                                    value={newSkill.level}
                                    onChange={(e) =>
                                        setNewSkill((p) => ({ ...p, level: e.target.value }))
                                    }
                                    className="px-3 py-2 border rounded"
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </label>

                            <label className="flex flex-col">
                                <span className="text-sm text-gray-600 mb-1">Target hours</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={newSkill.targetHours}
                                    onChange={(e) =>
                                        setNewSkill((p) => ({ ...p, targetHours: e.target.value }))
                                    }
                                    className="px-3 py-2 border rounded"
                                />
                            </label>

                            <label className="flex flex-col">
                                <span className="text-sm text-gray-600 mb-1">Target date</span>
                                <input
                                    type="date"
                                    value={newSkill.targetDate}
                                    onChange={(e) =>
                                        setNewSkill((p) => ({ ...p, targetDate: e.target.value }))
                                    }
                                    className="px-3 py-2 border rounded"
                                />
                            </label>
                        </div>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowAdd(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-50"
                                disabled={savingNew}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-60"
                                disabled={savingNew}
                            >
                                {savingNew ? "Creating..." : "Create Skill"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
};

export default Dashboard;

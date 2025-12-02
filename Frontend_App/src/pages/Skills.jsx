





















































































































































































































import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import AddSkillForm from "../components/AddSkillForm";
import SkillCard from "../components/SkillCard";
import Loading from "../components/Loading";

const Skills = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [query, setQuery] = useState("");
    const [levelFilter, setLevelFilter] = useState("all");

    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showAdd, setShowAdd] = useState(false);

    const loadSkills = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await api.getSkills();
            if (res?.skills) setSkills(res.skills);
            else if (Array.isArray(res)) setSkills(res);
            else setSkills([]);
        } catch (err) {
            setError(err.message || "Failed to load");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;
        loadSkills();
    }, [user]);

    const handleAddSkill = async (newSkill) => {
        setError("");
        try {
            const res = await api.createSkill(newSkill);
            const created = res?.skill || res;
            setSkills((prev) => [created, ...prev]);
            setShowAdd(false);
        } catch (err) {
            setError(err.message || "Failed to add");
            throw err;
        }
    };

    const handleDeleteSkill = async (skill) => {
        if (!confirm(`Delete "${skill.name}"?`)) return;
        await api.deleteSkill(skill._id || skill.id);
        setSkills((prev) =>
            prev.filter((s) => String(s._id || s.id) !== String(skill._id || skill.id))
        );
    };

    const handleView = (skill) => navigate(`/skills/${skill._id || skill.id}`);
    const handleEdit = handleView;
    const handleLog = handleView;

    const filtered = skills.filter((s) => {
        if (!s?.name) return false;
        const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
        const matchesLevel = levelFilter === "all" || s.level === levelFilter;
        return matchesQuery && matchesLevel;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
            <main className="max-w-6xl mx-auto px-4 py-10">

                {}
                <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                            Your Skills
                        </h1>
                        <p className="text-gray-400 mt-1">Build anything. Track everything.</p>
                    </div>

                    <button
                        onClick={() => setShowAdd(true)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-md hover:opacity-90 font-semibold self-start"
                    >
                        + Add Skill
                    </button>
                </div>

                {}
                {showAdd && (
                    <div className="mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-lg">
                        <h2 className="text-lg font-bold mb-4 text-cyan-300">New Skill</h2>
                        <AddSkillForm
                            onSave={handleAddSkill}
                            onCancel={() => setShowAdd(false)}
                        />
                    </div>
                )}

                {}
                <div className="flex flex-col md:flex-row gap-4 bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 mb-8 shadow">

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search skills…"
                        className="flex-1 bg-black/30 border border-white/10 rounded-md px-4 py-2 outline-none"
                    />

                    <select
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                        className="bg-black/30 border border-white/10 rounded-md px-3 py-2 w-full md:w-[220px]"
                    >
                        <option value="all">All levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                {}
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div className="text-red-400 text-center">{error}</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center text-gray-500 py-20 bg-white/5 rounded-xl border border-white/10">
                        No skills yet. Add one or stop pretending you’re busy.
                    </div>
                ) : (
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((skill) => (
                            <SkillCard
                                key={skill._id || skill.id}
                                skill={{
                                    id: skill._id || skill.id,
                                    name: skill.name,
                                    level: skill.level,
                                    hours: skill.totalHours || skill.hours || 0,
                                    targetHours: skill.targetHours,
                                    targetDate: skill.targetDate?.slice?.(0, 10) || null,
                                }}
                                onLog={() => handleLog(skill)}
                                onView={() => handleView(skill)}
                                onEdit={() => handleEdit(skill)}
                                onDelete={() => handleDeleteSkill(skill)}
                            />
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
};

export default Skills;

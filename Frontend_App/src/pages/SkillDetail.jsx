




























































































































































































































































































import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import SessionForm from "../components/SessionForm";
import EditSkillForm from "../components/EditSkillForm";
import Loading from "../components/Loading";

const SkillDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [skill, setSkill] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showSessionModal, setShowSessionModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [savingSession, setSavingSession] = useState(false);
    const [savingEdit, setSavingEdit] = useState(false);

    const loadData = async () => {
        setLoading(true);
        setError("");
        try {
            const skillRes = await api.getSkill(id);
            setSkill(skillRes?.skill || skillRes || null);

            const sessionsRes = await api.getSessions(id);
            setSessions(sessionsRes?.sessions || sessionsRes || []);
        } catch (err) {
            setError(err.message || "Failed to load skill");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user || !id) return;
        loadData();
    }, [user, id]);

    const handleSaveSession = async (payload) => {
        setSavingSession(true);
        try {
            const res = await api.addSession(id, payload);
            setSessions((prev) => [res?.session || res, ...prev]);
            setShowSessionModal(false);
        } finally {
            setSavingSession(false);
        }
    };

    const handleDeleteSession = async (sid) => {
        if (!confirm("Delete session?")) return;
        await api.deleteSession(sid);
        setSessions((p) => p.filter((s) => String(s._id || s.id) !== String(sid)));
    };

    const handleSaveEdit = async (updated) => {
        setSavingEdit(true);
        const res = await api.updateSkill(id, updated);
        setSkill(res?.skill || res);
        setShowEditModal(false);
        setSavingEdit(false);
    };

    if (loading) return <div className="py-20 text-center"><Loading /></div>;
    if (error) return <div className="py-20 text-center text-red-500">{error}</div>;
    if (!skill) return <div className="py-20 text-center text-gray-400">Not found</div>;

    const total = sessions.reduce((a, s) => a + Number(s.hours || 0), 0);
    const pct = skill.targetHours ? Math.round((total / skill.targetHours) * 100) : 0;
    const progress = Math.max(0, Math.min(100, pct));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
            <main className="max-w-5xl mx-auto px-4 py-10">

                {}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        <div>
                            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                                {skill.name}
                            </h1>
                            <p className="text-gray-400 mt-2">{skill.level}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="px-8 mt-[12px] mb-[12px] hover:bg-orange-400 font-semibold text-lg rounded-md border border-white/20 mr-[10px]"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setShowSessionModal(true)}
                                className="bg-gradient-to-r px-8 mt-[12px] mb-[12px] from-cyan-500 to-blue-600 px-4 py-2 rounded-md hover:opacity-90"
                            >
                                + Session
                            </button>
                        </div>

                    </div>

                    {}
                    <div className="mt-6">
                        <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                            <span>{total} hrs logged</span>
                            <span>{progress}%</span>
                        </div>
                    </div>
                </div>

                {}
                <section className="grid md:grid-cols-2 gap-6 mb-8">
                    {[
                        ["Target Hours", skill.targetHours || "—"],
                        ["Target Date", skill.targetDate?.slice?.(0, 10) || "—"],
                    ].map(([label, val]) => (
                        <div key={label} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
                            <p className="text-sm text-gray-400">{label}</p>
                            <p className="text-lg font-semibold">{val}</p>
                        </div>
                    ))}
                </section>

                {skill.notes && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
                        <p className="text-sm text-gray-400 mb-1">Notes</p>
                        <p className="text-gray-200">{skill.notes}</p>
                    </div>
                )}

                {}
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-cyan-300">Sessions</h2>

                    {sessions.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No sessions yet.</div>
                    ) : (
                        <div className="space-y-4">
                            {sessions.map((s) => (
                                <div key={s._id || s.id}
                                    className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4 flex justify-between hover:bg-white/10">

                                    <div>
                                        <p className="font-semibold">{s.hours} hrs</p>
                                        {s.notes && <p className="text-sm text-gray-400">{s.notes}</p>}
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">{s.date}</p>
                                        <button
                                            onClick={() => handleDeleteSession(s._id || s.id)}
                                            className="text-xs text-red-400 hover:text-red-300 mt-1"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {}
                {(showSessionModal || showEditModal) && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50"
                        onClick={() => { setShowSessionModal(false); setShowEditModal(false); }}
                    >
                        <div onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-white/10 rounded-xl p-6 w-full max-w-md">

                            {showSessionModal && (
                                <>
                                    <h3 className="font-bold text-lg mb-3">New Session</h3>
                                    <SessionForm
                                        initial={{ hours: 1, date: new Date().toISOString().slice(0, 10), notes: "" }}
                                        saving={savingSession}
                                        onSave={handleSaveSession}
                                        onCancel={() => setShowSessionModal(false)}
                                    />
                                </>
                            )}

                            {showEditModal && (
                                <>
                                    <h3 className="font-bold text-lg mb-3">Edit Skill</h3>
                                    <EditSkillForm
                                        saving={savingEdit}
                                        skill={skill}
                                        onSave={handleSaveEdit}
                                        onCancel={() => setShowEditModal(false)}
                                    />
                                </>
                            )}

                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SkillDetail;

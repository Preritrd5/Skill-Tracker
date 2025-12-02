




























































































































































































































































import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Analytics = () => {
    const [summary, setSummary] = useState(null);
    const [weekly, setWeekly] = useState({ weeks: [], totals: [] });
    const [selectedSkill, setSelectedSkill] = useState("");
    const [weeksCount, setWeeksCount] = useState(8);

    const [loadingSummary, setLoadingSummary] = useState(false);
    const [loadingWeekly, setLoadingWeekly] = useState(false);
    const [error, setError] = useState("");

    const loadSummary = async () => {
        setLoadingSummary(true);
        setError("");
        try {
            const res = await api.getSummary();
            setSummary(res || { totalHours: 0, activeSkills: 0, totalsPerSkill: [] });
        } catch (err) {
            setError(err.message || "Failed to load summary");
        } finally {
            setLoadingSummary(false);
        }
    };

    const loadWeekly = async (skillId = "", weeks = 8) => {
        setLoadingWeekly(true);
        setError("");
        try {
            const res = await api.getWeeklyAnalytics(skillId || "", weeks);
            setWeekly(res || { weeks: [], totals: [] });
        } catch (err) {
            setError(err.message || "Failed to load weekly analytics");
        } finally {
            setLoadingWeekly(false);
        }
    };

    useEffect(() => {
        loadSummary();
    }, []);

    useEffect(() => {
        loadWeekly(selectedSkill, weeksCount);
    }, [selectedSkill, weeksCount]);

    const lineData = {
        labels: weekly.weeks || [],
        datasets: [
            {
                label: selectedSkill ? "Hours (selected skill)" : "Hours (all skills)",
                data: weekly.totals || [],
                fill: true,
                tension: 0.25,
                borderWidth: 2,
                backgroundColor: "rgba(34,211,238,0.1)",
                borderColor: "rgb(34,211,238)",
                pointBackgroundColor: "rgb(103,232,249)",
            },
        ],
    };

    const barData = {
        labels: (summary?.totalsPerSkill || []).map((s) => s.name),
        datasets: [
            {
                label: "Total hours",
                data: (summary?.totalsPerSkill || []).map((s) => s.total),
                borderRadius: 8,
                barThickness: 26,
                backgroundColor: (summary?.totalsPerSkill || []).map(
                    (_, i) => `hsl(${(i * 50) % 360}, 80%, 60%)`
                ),
            },
        ],
    };

    const commonOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { intersect: false, mode: "index" },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
            y: { beginAtZero: true, ticks: { color: "#94a3b8" } },
        },
    };

    return (
        <div className="min-h-screen mb-[205px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <main className="max-w-6xl mx-auto px-4 py-10 text-white">

                {}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Analytics Dashboard
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Track your progress like a professional.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-500/10 text-red-400 p-3 rounded-lg border border-red-500/20">
                        {error}
                    </div>
                )}

                {}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    {[
                        { label: "Total Hours", value: summary?.totalHours ?? 0, unit: "hrs" },
                        { label: "Active Skills", value: summary?.activeSkills ?? 0 },
                        { label: "Tracked Skills", value: (summary?.totalsPerSkill || []).length },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-xl hover:bg-white/10 transition"
                        >
                            <div className="text-gray-400 text-sm">{item.label}</div>
                            <div className="text-3xl font-bold text-cyan-300 mt-2">
                                {loadingSummary ? "..." : item.value} {item.unit || ""}
                            </div>
                        </div>
                    ))}
                </div>

                {}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between mb-10">

                    <div className="flex gap-4">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Skill</label>
                            <select
                                value={selectedSkill}
                                onChange={(e) => setSelectedSkill(e.target.value)}
                                className="bg-black/40 border border-white/10 text-white px-3 py-2 rounded-md focus:outline-none"
                            >
                                <option value="">All skills</option>
                                {(summary?.totalsPerSkill || []).map((s) => (
                                    <option key={s.skillId} value={s.skillId}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Weeks</label>
                            <select
                                value={weeksCount}
                                onChange={(e) => setWeeksCount(Number(e.target.value))}
                                className="bg-black/40 border border-white/10 text-white px-3 py-2 rounded-md"
                            >
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                                <option value={12}>12</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            loadSummary();
                            loadWeekly(selectedSkill, weeksCount);
                        }}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-md hover:opacity-90 transition font-semibold"
                    >
                        Refresh
                    </button>
                </div>

                {}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-lg">
                        {loadingWeekly ? (
                            <div className="text-center text-gray-400 py-10">Loading...</div>
                        ) : weekly.weeks.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">No data.</div>
                        ) : (
                            <Line
                                data={lineData}
                                options={{ ...commonOptions, plugins: { title: { display: true, text: "Weekly Activity" } } }}
                            />
                        )}
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-lg">
                        {!summary || summary.totalsPerSkill.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">No skills yet.</div>
                        ) : (
                            <Bar
                                data={barData}
                                options={{ ...commonOptions, plugins: { title: { display: true, text: "Hours by Skill" } } }}
                            />
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Analytics;

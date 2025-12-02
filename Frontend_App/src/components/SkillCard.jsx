import React from "react";
import PropTypes from "prop-types";

const SkillCard = ({ skill, onLog, onView, onEdit, onDelete }) => {
    const hours = Number(skill.hours || 0);
    const target = Number(skill.targetHours || 0);
    const progressPct = target > 0 ? Math.round((hours / target) * 100) : 0;
    const safePct = Math.max(0, Math.min(100, progressPct));

    const accent = skill.color || "from-green-400 to-blue-400";

    return (
        <article
            className="bg-slate-50  backdrop-blur-md rounded-xl p-5 shadow-md border border-gray-200
                       hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer"
        >
            <header className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold shadow-md`}
                        style={{
                            background: `linear-gradient(135deg,#06b6d4,#3b82f6)`,
                        }}
                        aria-hidden
                    >
                        {skill.name?.charAt(0)?.toUpperCase() || "S"}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                        <div className="text-sm text-gray-500">{skill.level}</div>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-xs text-gray-400">Target date</div>
                    <div className="text-sm font-medium text-gray-700">
                        {skill.targetDate || "—"}
                    </div>
                </div>
            </header>

            <div className="mt-5">
                <div className="w-full bg-gray-200/70 rounded-full h-2.5 overflow-hidden">
                    <div
                        className={`h-2.5 rounded-full bg-gradient-to-r ${accent} transition-all duration-500`}
                        style={{ width: `${safePct}%` }}
                        aria-valuenow={safePct}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        role="progressbar"
                    />
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <div className="font-medium text-gray-700">{hours} hrs</div>
                    <div className="font-semibold text-gray-700">{safePct}%</div>
                </div>
            </div>

            <footer className="mt-6 flex gap-2">
                <button
                    onClick={() => onView && onView(skill)}
                    className="text-md px-20 py-2 rounded-lg bg-blue-600 text-white font-medium
                               hover:bg-blue-500 hover:shadow-lg active:scale-95 transition-all duration-200 mx-auto"
                >
                    View
                </button>
            </footer>
        </article>
    );
};

SkillCard.propTypes = {
    skill: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
        level: PropTypes.string,
        hours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        targetHours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        targetDate: PropTypes.string,
        color: PropTypes.string,
    }).isRequired,
    onLog: PropTypes.func,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default SkillCard;

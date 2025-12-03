import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";



const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const EditSkillForm = ({ skill, onSave, onCancel, saving }) => {
    const [name, setName] = useState(skill?.name || "");
    const [level, setLevel] = useState(skill?.level || "Beginner");
    const [targetHours, setTargetHours] = useState(skill?.targetHours ?? "");
    const [targetDate, setTargetDate] = useState(skill?.targetDate || "");
    const [notes, setNotes] = useState(skill?.notes || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        setName(skill?.name || "");
        setLevel(skill?.level || "Beginner");
        setTargetHours(skill?.targetHours ?? "");
        setTargetDate(skill?.targetDate || "");
        setNotes(skill?.notes || "");
        setError("");
    }, [skill]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Skill name is required.");
            return;
        }

        const payload = {
            id: skill?.id || skill?._id,
            name: name.trim(),
            level,
            targetHours: targetHours === "" ? null : Number(targetHours),
            targetDate: targetDate || null,
            notes: notes.trim() || null,
        };

        try {
            setLoading(true);
            await Promise.resolve(onSave(payload));

        } catch (err) {
            console.error(err);
            setError(err?.message || "Failed to save changes.");
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const isSaving = typeof saving === "boolean" ? saving : loading;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-600">{error}</div>}

            <div>
                <label className="block text-sm text-white">Skill name *</label>
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Python"
                    className="mt-1 w-full px-3 py-2 border rounded text-blue-600"
                    required
                    disabled={isSaving}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm text-white">Level</label>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border rounded text-blue-600"
                        disabled={isSaving}
                    >
                        {LEVELS.map((l) => (
                            <option key={l} value={l}>
                                {l}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-white">Target hours</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={targetHours}
                        onChange={(e) => setTargetHours(e.target.value)}
                        placeholder="e.g., 100"
                        className="mt-1 w-full px-3 py-2 border rounded text-blue-600"
                        disabled={isSaving}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-white">Target date (optional)</label>
                <input
                    type="date"
                    value={targetDate || ""}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded text-blue-600"
                    disabled={isSaving}
                />
            </div>

            <div>
                <label className="block text-sm text-white">Notes (optional)</label>
                <textarea
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded text-blue-600"
                    disabled={isSaving}
                />
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => onCancel && onCancel()}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                    disabled={isSaving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-60"
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
};

EditSkillForm.propTypes = {
    skill: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    saving: PropTypes.bool,
};

export default EditSkillForm;

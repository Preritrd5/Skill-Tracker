import React, { useState } from "react";
import PropTypes from "prop-types";



const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const AddSkillForm = ({ onSave, onCancel }) => {
    const [name, setName] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [targetHours, setTargetHours] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const reset = () => {
        setName("");
        setLevel("Beginner");
        setTargetHours("");
        setTargetDate("");
        setNotes("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Please enter a skill name.");
            return;
        }

        const payload = {
            name: name.trim(),
            level,
            targetHours: targetHours === "" ? null : Number(targetHours),
            targetDate: targetDate || null,
            notes: notes.trim() || null,
        };

        try {
            setLoading(true);
            
            await Promise.resolve(onSave(payload));
            reset();
        } catch (err) {
            console.error(err);
            setError(err?.message || "Failed to add skill. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-600">{error}</div>}

            <div>
                <label className="block text-sm text-gray-600">Skill name *</label>
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Python"
                    className="mt-1 w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm text-gray-600">Level</label>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border rounded"
                    >
                        {LEVELS.map((l) => (
                            <option key={l} value={l}>
                                {l}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600">Target hours</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={targetHours}
                        onChange={(e) => setTargetHours(e.target.value)}
                        placeholder="e.g., 100"
                        className="mt-1 w-full px-3 py-2 border rounded"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-600">Target date (optional)</label>
                <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded"
                />
            </div>

            <div>
                <label className="block text-sm text-gray-600">Notes (optional)</label>
                <textarea
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded"
                    placeholder="Add context — e.g., resources, goal details"
                />
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => {
                        reset(); onCancel?.(); 
                        onCancel && onCancel();
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                    disabled={loading}>
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Skill"}
                </button>
            </div>
        </form>
    );
};

AddSkillForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default AddSkillForm;

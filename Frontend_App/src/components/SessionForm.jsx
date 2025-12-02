import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";



const SessionForm = ({ initial = {}, onSave, onCancel, saving = false }) => {
    const [hours, setHours] = useState(initial.hours ?? "");
    const [date, setDate] = useState(initial.date ?? new Date().toISOString().slice(0, 10)); 
    const [notes, setNotes] = useState(initial.notes ?? "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setHours(initial.hours ?? "");
        setDate(initial.date ?? new Date().toISOString().slice(0, 10));
        setNotes(initial.notes ?? "");
        setError("");
    }, [initial]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const num = Number(hours);
        if (!hours || isNaN(num) || num <= 0) {
            setError("Please enter a valid number of hours.");
            return;
        }
        if (!date) {
            setError("Please select a date.");
            return;
        }

        const payload = {
            hours: num,
            date,
            notes: notes.trim() || "",
        };

        try {
            await Promise.resolve(onSave(payload));
            setHours("");
            setNotes("");
            setDate(new Date().toISOString().slice(0, 10));
        } catch (err) {
            console.error("SessionForm onSave error:", err);
            setError(err?.message || "Failed to save session");
            
            throw err;
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-600">{error}</div>}

            <div>
                <label className="text-sm text-gray-600">Hours Studied</label>
                <input
                    type="number"
                    min="0"
                    step="0.25"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded"
                    placeholder="e.g., 1.5"
                    required
                />
            </div>

            <div>
                <label className="text-sm text-gray-600">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="text-sm text-gray-600">Notes (optional)</label>
                <textarea
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded"
                    placeholder="What did you work on?"
                />
            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => onCancel && onCancel()}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                    disabled={loading}
                >
                    Cancel
                </button>

                {}
                <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-60"
                >
                    {saving ? "Saving..." : "Save"}
                </button>

            </div>
        </form>
    );
};

SessionForm.propTypes = {
    initial: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default SessionForm;

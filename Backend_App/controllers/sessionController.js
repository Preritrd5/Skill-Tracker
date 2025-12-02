const Session = require("../models/SessionModal");
const Skill = require("../models/SkillModal");


exports.getSessionsBySkill = async (req, res) => {
    try {
        const { id: skillId } = req.params;

        const skill = await Skill.findById(skillId);
        if (!skill) return res.status(404).json({ message: "Skill not found" });
        if (skill.user.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        const sessions = await Session.find({ skill: skillId, user: req.user._id })
            .sort({ date: -1 });

        res.json({ sessions });

    } catch (error) {
        console.error("getSessionsBySkill error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.addSession = async (req, res) => {
    try {
        const { id: skillId } = req.params;
        const { hours, date, notes } = req.body;

        if (!hours || !date)
            return res.status(400).json({ message: "Hours and date are required" });

        const skill = await Skill.findById(skillId);
        if (!skill) return res.status(404).json({ message: "Skill not found" });
        if (skill.user.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        const newSession = await Session.create({
            skill: skillId,
            user: req.user._id,
            hours,
            date,
            notes: notes || "",
        });

        res.status(201).json({ session: newSession });

    } catch (error) {
        console.error("addSession error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.deleteSession = async (req, res) => {
    try {
        const { id: sessionId } = req.params;

        const session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({ message: "Session not found" });

        if (session.user.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Not authorized" });

        await session.remove();

        res.json({ message: "Session deleted" });

    } catch (error) {
        console.error("deleteSession error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

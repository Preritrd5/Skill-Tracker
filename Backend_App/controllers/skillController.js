
const Skill = require("../models/SkillModal"); 



exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ user: req.user._id }).sort({ createdAt: -1 });
        return res.json({ skills });
    } catch (err) {
        console.error("getSkills error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};



exports.createSkill = async (req, res) => {
    try {
        const { name, level, targetHours, targetDate, notes } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Skill name is required" });
        }

        const skill = await Skill.create({
            user: req.user._id,
            name: name.trim(),
            level: level || "Beginner",
            targetHours: targetHours === undefined ? null : targetHours,
            targetDate: targetDate || null,
            notes: notes || null,
        });

        return res.status(201).json({ skill });
    } catch (err) {
        console.error("createSkill error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};



exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: "Skill not found" });
        if (skill.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        return res.json({ skill });
    } catch (err) {
        console.error("getSkillById error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};



exports.updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: "Skill not found" });
        if (skill.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const { name, level, targetHours, targetDate, notes } = req.body;
        if (name !== undefined) skill.name = name.trim();
        if (level !== undefined) skill.level = level;
        if (targetHours !== undefined) skill.targetHours = targetHours;
        if (targetDate !== undefined) skill.targetDate = targetDate;
        if (notes !== undefined) skill.notes = notes;

        await skill.save();
        return res.json({ skill });
    } catch (err) {
        console.error("updateSkill error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};



exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: "Skill not found" });
        if (skill.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await skill.remove();
        return res.json({ message: "Skill deleted" });
    } catch (err) {
        console.error("deleteSkill error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

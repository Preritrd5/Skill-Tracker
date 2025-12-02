const Session = require("../models/SessionModal");
const Skill = require("../models/SkillModal");


function getWeekStarts(weeks = 8) {
    const today = new Date();
    
    const day = today.getDay();
    const diff = (day + 6) % 7; 
    const thisMon = new Date(today);
    thisMon.setDate(today.getDate() - diff);
    thisMon.setHours(0, 0, 0, 0);

    const arr = [];
    for (let i = weeks - 1; i >= 0; i--) {
        const d = new Date(thisMon);
        d.setDate(thisMon.getDate() - i * 7);
        arr.push(d);
    }
    return arr;
}



exports.weekly = async (req, res) => {
    try {
        const userId = req.user._id;
        const weeks = Number(req.query.weeks) || 8;
        const skillId = req.query.skillId || null;

        
        const weekStarts = getWeekStarts(weeks);

        
        const baseFilter = { user: userId };
        if (skillId) {
            baseFilter.skill = skillId;
        }

        
        const fromDate = weekStarts[0];

        
        const allSessions = await Session.find({
            ...baseFilter,
            
        }).lean();

        
        const totals = weekStarts.map((mon) => {
            const sun = new Date(mon);
            sun.setDate(mon.getDate() + 6);

            const sum = allSessions.reduce((acc, s) => {
                const sd = new Date(s.date + "T00:00:00");
                if (sd >= mon && sd <= sun) return acc + (s.hours || 0);
                return acc;
            }, 0);
            return Math.round(sum * 100) / 100;
        });

        res.json({
            weeks: weekStarts.map((d) => d.toISOString().slice(0, 10)),
            totals,
        });
    } catch (err) {
        console.error("analytics.weekly error:", err);
        res.status(500).json({ message: "Server error" });
    }
}



exports.summary = async (req, res) => {
    try {
        const userId = req.user._id;

        
        const skills = await Skill.find({ user: userId }).lean();

        
        const sessions = await Session.find({ user: userId }).lean();

        
        const totalsPerSkill = skills.map((sk) => {
            const total = sessions
                .filter((s) => s.skill.toString() === sk._id.toString())
                .reduce((acc, s) => acc + (s.hours || 0), 0);
            return {
                skillId: sk._id,
                name: sk.name,
                total: Math.round(total * 100) / 100,
            };
        });

        const totalHours = totalsPerSkill.reduce((a, b) => a + (b.total || 0), 0);
        const activeSkills = totalsPerSkill.filter((t) => t.total > 0).length;

        res.json({
            totalHours: Math.round(totalHours * 100) / 100,
            activeSkills,
            totalsPerSkill,
        });
    } catch (err) {
        console.error("analytics.summary error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
const express = require("express");
const skillRouter = express.Router();
const protect = require("../middleware/authMiddleware");
const {
    getSkills,
    createSkill,
    getSkillById,
    updateSkill,
    deleteSkill,
} = require("../controllers/skillController");



skillRouter.get("/", protect, getSkills);


skillRouter.post("/", protect, createSkill);


skillRouter.get("/:id", protect, getSkillById);


skillRouter.put("/:id", protect, updateSkill);


skillRouter.delete("/:id", protect, deleteSkill);

module.exports = skillRouter;

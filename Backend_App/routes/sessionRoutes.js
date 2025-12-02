const express = require("express");
const sessionRouter = express.Router();
const protect = require("../middleware/authMiddleware");
const {
    getSessionsBySkill,
    addSession,
    deleteSession,
} = require("../controllers/sessionController");


sessionRouter.get("/:id", protect, getSessionsBySkill);


sessionRouter.post("/:id", protect, addSession);


sessionRouter.delete("/single/:id", protect, deleteSession);

module.exports = sessionRouter;

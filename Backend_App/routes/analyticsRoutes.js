const express = require("express");
const analyticsRouter = express.Router();
const protect = require("../middleware/authMiddleware");
const { weekly, summary } = require("../controllers/analyticsController");


analyticsRouter.get("/weekly", protect, weekly);


analyticsRouter.get("/summary", protect, summary);

module.exports = analyticsRouter;

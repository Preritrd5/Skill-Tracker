const express = require("express");
const authRouter = express.Router();
const { signup, login, getMe, updateMe } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");


authRouter.get("/", (req, res) => {
    res.send("Auth route working");
});

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);
authRouter.put("/me", protect, updateMe);

module.exports = authRouter;

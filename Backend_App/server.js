require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const authRouter = require("./routes/authRoutes");
const skillRouter = require("./routes/skillRoutes");
const sessionRouter = require("./routes/sessionRoutes");
const analyticsRouter = require("./routes/analyticsRoutes");

const app = express();

/* ---------------------------------------------------------
      CORS — CLEAN + FRESH FOR NEW DEPLOYMENT
----------------------------------------------------------- */
const allowedOrigins = [
    "http://localhost:5173",         // local dev
    process.env.FRONTEND_URL         // new vercel URL (we set later)
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log("❌ Blocked CORS origin:", origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

/* ---------------------------------------------------------
      MIDDLEWARE
----------------------------------------------------------- */
app.use(express.json());
app.use(morgan("dev"));

/* ---------------------------------------------------------
      CONNECT TO DATABASE
----------------------------------------------------------- */
connectDB();

/* ---------------------------------------------------------
      ROUTES
----------------------------------------------------------- */
app.use("/api/auth", authRouter);
app.use("/api/skills", skillRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/analytics", analyticsRouter);

/* ---------------------------------------------------------
      HEALTH ROUTE (IMPORTANT FOR RENDER)
----------------------------------------------------------- */
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Backend running" });
});

/* ---------------------------------------------------------
      ROOT UI PAGE
----------------------------------------------------------- */
app.get("/", (req, res) => {
    res.send(`
    <html>
      <h1>Skill Tracker API</h1>
      <p>Backend running on Render ✔️</p>
    </html>
  `);
});

/* ---------------------------------------------------------
      GLOBAL ERROR HANDLER
----------------------------------------------------------- */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Server error" });
});

/* ---------------------------------------------------------
      START SERVER
----------------------------------------------------------- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));

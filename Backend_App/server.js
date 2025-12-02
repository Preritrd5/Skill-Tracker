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

// ⭐ FIXED CORS CONFIG (THIS IS WHAT WAS BREAKING YOUR FRONTEND)
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://skill-tracker-inky.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);

app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/skills", skillRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/analytics", analyticsRouter);

// Root route
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Skill Tracker</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: #f0f4f8;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 80vh;
                margin: 0;
                color: #333;
            }
            h1 {
                font-size: 3rem;
                color: #2c3e50;
                margin-bottom: 0.5rem;
            }
            p {
                font-size: 1.2rem;
                color: #555;
                max-width: 500px;
                text-align: center;
            }
            .status {
                margin-top: 2rem;
                padding: 1rem 2rem;
                background: #2ecc71;
                color: white;
                border-radius: 8px;
                font-weight: bold;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
        </style>
    </head>
    <body>
        <h1>Skill Tracker API</h1>
        <p>Backend is connected and running.</p>
        <div class="status">Running on Render ✅</div>
    </body>
    </html>
  `);
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Server error" });
});

// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    console.log(`Server running on port http://localhost:${PORT}`)
);

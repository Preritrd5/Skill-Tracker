const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skill_tracker_dev";
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("🍃 MongoDB connected Successfully");
    } catch (err) {
        console.error("🚫 MongoDB connection error :", err);
        process.exit(1);
    }
};

module.exports = connectDB;

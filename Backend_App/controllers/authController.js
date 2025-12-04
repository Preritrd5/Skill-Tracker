
const bcrypt = require("bcryptjs");
const User = require("../models/UserModal"); 
const generateToken = require("../utils/generateToken");




exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const newUser = await User.create({
            name,
            email,
            password, 
        });

        
        const token = generateToken(newUser._id);

        res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        
        const user = await User.findOne({ email }).select("+password");

        
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        
        const token = generateToken(user._id);

        
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile ?? null,
                location: user.location ?? null,
                bio: user.bio ?? null,
            },
            token,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};




exports.getMe = async (req, res) => {
    res.json({
        user: req.user, 
    });
};


exports.updateMe = async (req, res) => {
    try {
        const userId = req.user && req.user._id;
        if (!userId) return res.status(401).json({ message: "Not authorized" });

        const { name, email, password, currentPassword, mobile, location, bio } = req.body;

        const updates = {};
        if (typeof name === "string" && name.trim() !== "") updates.name = name.trim();
        if (typeof email === "string" && email.trim() !== "") updates.email = email.trim().toLowerCase();
        if (typeof mobile === "string") updates.mobile = mobile.trim() || null;
        if (typeof location === "string") updates.location = location.trim() || null;
        if (typeof bio === "string") updates.bio = bio.trim() || null;

        
        if (password) {
            
            if (typeof currentPassword === "string" && currentPassword.trim()) {
                const me = await User.findById(userId).select("+password");
                if (!me) return res.status(404).json({ message: "User not found" });
                const match = await bcrypt.compare(currentPassword, me.password);
                if (!match) return res.status(400).json({ message: "Current password is incorrect" });
            }
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters" });
            }
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        const updated = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select("-password");
        if (!updated) return res.status(404).json({ message: "User not found" });

        return res.json({ user: updated });
    } catch (err) {
        console.error("updateMe error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

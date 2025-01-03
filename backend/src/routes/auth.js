import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;
        console.log("Received registration request:", { email, name }); // Debug log

        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name
        });

        await newUser.save();
        console.log("User created successfully:", newUser._id); // Debug log
        
        res.status(201).json({ 
            message: "User created successfully",
            user: { id: newUser._id, email: newUser.email, name: newUser.name }
        });
    } catch (err) {
        console.error("Registration error:", err); // Debug log
        res.status(500).json({ message: "Server error during registration" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router; 
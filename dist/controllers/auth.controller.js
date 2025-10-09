"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.me = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
// 🔹 Simple login — no JWT or cookie
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });
        const user = await user_model_1.User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const ok = await bcrypt_1.default.compare(password, user.password);
        if (!ok)
            return res.status(401).json({ message: "Invalid credentials" });
        // ✅ Just return the user info, no token
        return res.json({
            message: "Login successful ✅",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;
// 🔹 Return mock user for testing (no auth check)
const me = async (req, res) => {
    return res.json({ message: "Auth disabled for testing" });
};
exports.me = me;
// 🔹 Logout (no cookie clearing since none used)
const logout = (_req, res) => {
    return res.json({ message: "Logout successful (token disabled)" });
};
exports.logout = logout;

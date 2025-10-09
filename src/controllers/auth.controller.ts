import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

// 🔹 Simple login — no JWT or cookie
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

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
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Return mock user for testing (no auth check)
export const me = async (req: Request, res: Response) => {
  return res.json({ message: "Auth disabled for testing" });
};

// 🔹 Logout (no cookie clearing since none used)
export const logout = (_req: Request, res: Response) => {
  return res.json({ message: "Logout successful (token disabled)" });
};

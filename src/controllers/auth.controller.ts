import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";


export const login = async (req: Request, res: Response) => {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: "Email and password required" });
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: "Invalid credentials" });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ message: "Invalid credentials" });


const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });


// Optionally set cookie (httpOnly)
res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 7*24*60*60*1000 });


res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
};


export const me = async (req: Request, res: Response) => {
// req.user set by auth middleware
const user = (req as any).user;
if (!user) return res.status(401).json({ message: "Unauthorized" });
res.json({ id: user._id, email: user.email, name: user.name, role: user.role });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ message: "Logged out successfully" });
};
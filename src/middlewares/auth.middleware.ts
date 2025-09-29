import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";


export interface AuthRequest extends Request {
user?: any;
}


export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
try {
const authHeader = req.headers.authorization || '';
const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.token;
if (!token) return res.status(401).json({ message: 'Unauthorized' });
const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
const user = await User.findById(payload.id).select('-password');
if (!user) return res.status(401).json({ message: 'Unauthorized' });
req.user = user;
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid token' });
}
};


export const requireOwner = (req: AuthRequest, res: Response, next: NextFunction) => {
if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
if (req.user.role !== 'owner') return res.status(403).json({ message: 'Forbidden' });
next();
};
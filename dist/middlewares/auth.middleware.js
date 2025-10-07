"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireOwner = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.token;
        if (!token)
            return res.status(401).json({ message: 'Unauthorized' });
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.User.findById(payload.id).select('-password');
        if (!user)
            return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.requireAuth = requireAuth;
const requireOwner = (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== 'owner')
        return res.status(403).json({ message: 'Forbidden' });
    next();
};
exports.requireOwner = requireOwner;

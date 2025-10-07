"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
const seed = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('Connected to Mongo for seeding');
        const email = process.env.ADMIN_EMAIL;
        const existing = await user_model_1.User.findOne({ email });
        if (existing) {
            console.log('Admin already exists');
            process.exit(0);
        }
        const hashed = await bcrypt_1.default.hash(process.env.ADMIN_PASSWORD, 10);
        await user_model_1.User.create({ email, password: hashed, name: process.env.ADMIN_NAME || 'Owner', role: 'owner' });
        console.log('Admin user created');
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
seed();

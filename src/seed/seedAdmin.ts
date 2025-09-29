import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";


dotenv.config();


const seed = async () => {
try {
await mongoose.connect(process.env.MONGO_URI!);
console.log('Connected to Mongo for seeding');
const email = process.env.ADMIN_EMAIL!;
const existing = await User.findOne({ email });
if (existing) {
console.log('Admin already exists');
process.exit(0);
}
const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
await User.create({ email, password: hashed, name: process.env.ADMIN_NAME || 'Owner', role: 'owner' });
console.log('Admin user created');
process.exit(0);
} catch (err) {
console.error(err);
process.exit(1);
}
};


seed();
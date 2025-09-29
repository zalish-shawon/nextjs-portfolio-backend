import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
email: string;
password: string;
name: string;
role: "owner" | "admin" | "editor";
}


const UserSchema: Schema = new Schema({
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
name: { type: String, required: true },
role: { type: String, enum: ["owner", "admin", "editor"], default: "owner" }
}, { timestamps: true });


export const User = mongoose.model<IUser>("User", UserSchema);
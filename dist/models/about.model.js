"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const experienceSchema = new mongoose_1.default.Schema({
    company: String,
    role: String,
    years: String,
    description: String,
});
const aboutSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    title: String,
    bio: String,
    experience: [experienceSchema],
    skills: [String],
});
exports.default = mongoose_1.default.models.About || mongoose_1.default.model("About", aboutSchema);

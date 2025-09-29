import mongoose, { Schema, Document } from "mongoose";


export interface IProject extends Document {
title: string;
slug: string;
description: string;
features?: string[];
thumbnail?: string;
repoUrl?: string;
liveUrl?: string;
stack?: string[];
published: boolean;
}


const ProjectSchema: Schema = new Schema({
title: { type: String, required: true },
slug: { type: String, required: true, unique: true },
description: { type: String, required: true },
features: [String],
thumbnail: String,
repoUrl: String,
liveUrl: String,
stack: [String],
published: { type: Boolean, default: true }
}, { timestamps: true });


export const Project = mongoose.model<IProject>("Project", ProjectSchema);
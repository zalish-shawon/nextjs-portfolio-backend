import mongoose, { Schema, Document } from "mongoose";


export interface IBlog extends Document {
title: string;
slug: string;
excerpt?: string;
content: string;
coverImage?: string;
tags?: string[];
published: boolean;
author: mongoose.Types.ObjectId;
publishedAt?: Date;
}


const BlogSchema: Schema = new Schema({
title: { type: String, required: true },
slug: { type: String, required: true, unique: true },
excerpt: String,
content: { type: String, required: true },
coverImage: String,
tags: [String],
published: { type: Boolean, default: false },
author: { type: Schema.Types.ObjectId, ref: "User" },
publishedAt: Date
}, { timestamps: true });


export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
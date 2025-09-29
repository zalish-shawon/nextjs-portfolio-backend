import { Request, Response } from "express";
import { Project } from "../models/project.model";


export const listPublicProjects = async (req: Request, res: Response) => {
const docs = await Project.find({ published: true }).select('title slug description thumbnail liveUrl repoUrl stack');
res.json(docs);
};


export const getProjectBySlug = async (req: Request, res: Response) => {
const slug = req.params.slug;
const doc = await Project.findOne({ slug, published: true });
if (!doc) return res.status(404).json({ message: 'Not found' });
res.json(doc);
};


export const createProject = async (req: Request, res: Response) => {
const data = req.body;
const exists = await Project.findOne({ slug: data.slug });
if (exists) return res.status(400).json({ message: 'Slug exists' });
const project = await Project.create(data);
res.status(201).json(project);
};


export const updateProject = async (req: Request, res: Response) => {
const id = req.params.id;
const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
if (!project) return res.status(404).json({ message: 'Not found' });
res.json(project);
};


export const deleteProject = async (req: Request, res: Response) => {
const id = req.params.id;
await Project.findByIdAndDelete(id);
res.json({ ok: true });
};
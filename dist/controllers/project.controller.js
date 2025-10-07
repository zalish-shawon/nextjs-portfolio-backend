"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectBySlug = exports.listPublicProjects = void 0;
const project_model_1 = require("../models/project.model");
const listPublicProjects = async (req, res) => {
    const docs = await project_model_1.Project.find({ published: true }).select('title slug description thumbnail liveUrl repoUrl stack');
    res.json(docs);
};
exports.listPublicProjects = listPublicProjects;
const getProjectBySlug = async (req, res) => {
    const slug = req.params.slug;
    const doc = await project_model_1.Project.findOne({ slug, published: true });
    if (!doc)
        return res.status(404).json({ message: 'Not found' });
    res.json(doc);
};
exports.getProjectBySlug = getProjectBySlug;
const createProject = async (req, res) => {
    const data = req.body;
    const exists = await project_model_1.Project.findOne({ slug: data.slug });
    if (exists)
        return res.status(400).json({ message: 'Slug exists' });
    const project = await project_model_1.Project.create(data);
    res.status(201).json(project);
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    const id = req.params.id;
    const project = await project_model_1.Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!project)
        return res.status(404).json({ message: 'Not found' });
    res.json(project);
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    const id = req.params.id;
    await project_model_1.Project.findByIdAndDelete(id);
    res.json({ ok: true });
};
exports.deleteProject = deleteProject;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBySlug = exports.listPublic = void 0;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const blog_model_1 = require("../models/blog.model");
const listPublic = async (req, res) => {
    try {
        const docs = await blog_model_1.Blog.find()
            .sort({ publishedAt: -1 }) // optional, remove if not needed
            .select("title slug excerpt coverImage tags publishedAt");
        res.json(docs);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.listPublic = listPublic;
const getBySlug = async (req, res) => {
    const slug = req.params.slug;
    const doc = await blog_model_1.Blog.findOne({ slug, published: true }).populate("author", "name email");
    if (!doc)
        return res.status(404).json({ message: "Not found" });
    res.json(doc);
};
exports.getBySlug = getBySlug;
const createBlog = async (req, res) => {
    const { title, slug, content, excerpt, tags, published, imageUrl } = req.body;
    console.log(title, slug, content, excerpt, tags, published, imageUrl);
    if (!title || !slug || !content)
        return res
            .status(400)
            .json({ message: "title, slug and content required" });
    const exists = await blog_model_1.Blog.findOne({ slug });
    if (exists)
        return res.status(400).json({ message: "Slug already exists" });
    // sanitize content
    const clean = (0, sanitize_html_1.default)(content, {
        allowedTags: sanitize_html_1.default.defaults.allowedTags.concat(["img"]),
    });
    const blog = await blog_model_1.Blog.create({
        title,
        slug,
        content: clean,
        excerpt,
        tags,
        published: !!published,
        author: req.user._id,
        publishedAt: published ? new Date() : undefined,
        coverImage: req.file ? req.file.path : null, // Cloudinary URL
    });
    res.status(201).json(blog);
};
exports.createBlog = createBlog;
const updateBlog = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (data.content)
        data.content = (0, sanitize_html_1.default)(data.content, {
            allowedTags: sanitize_html_1.default.defaults.allowedTags.concat(["img"]),
        });
    const blog = await blog_model_1.Blog.findByIdAndUpdate(id, data, { new: true });
    if (!blog)
        return res.status(404).json({ message: "Not found" });
    res.json(blog);
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    const id = req.params.id;
    await blog_model_1.Blog.findByIdAndDelete(id);
    res.json({ ok: true });
};
exports.deleteBlog = deleteBlog;

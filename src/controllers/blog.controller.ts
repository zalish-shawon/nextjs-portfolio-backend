import { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import { Blog } from "../models/blog.model";

export const listPublic = async (req: Request, res: Response) => {
  try {
    const docs = await Blog.find()
      .sort({ publishedAt: -1 }) // optional, remove if not needed
      .select("title slug excerpt coverImage tags publishedAt");

    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};




export const getBySlug = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const doc = await Blog.findOne({ slug, published: true }).populate(
    "author",
    "name email"
  );
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const createBlog = async (req: Request, res: Response) => {
  const { title, slug, content, excerpt, tags, published, imageUrl } = req.body;
  console.log(title, slug, content, excerpt, tags, published, imageUrl);
  if (!title || !slug || !content)
    return res
      .status(400)
      .json({ message: "title, slug and content required" });

  const exists = await Blog.findOne({ slug });
  if (exists) return res.status(400).json({ message: "Slug already exists" });

  // sanitize content
  const clean = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });

  const blog = await Blog.create({
    title,
    slug,
    content: clean,
    excerpt,
    tags,
    published: !!published,
    author: (req as any).user._id,
    publishedAt: published ? new Date() : undefined,
    coverImage: req.file ? (req.file as any).path : null, // Cloudinary URL
  });
  res.status(201).json(blog);
};

export const updateBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  if (data.content)
    data.content = sanitizeHtml(data.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    });
  const blog = await Blog.findByIdAndUpdate(id, data, { new: true });
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
};

export const deleteBlog = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  res.json({ ok: true });
};

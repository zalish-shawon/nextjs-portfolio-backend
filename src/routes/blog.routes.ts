import { Router } from "express";
import { listPublic, getBySlug, createBlog, updateBlog, deleteBlog } from "../controllers/blog.controller";
import { requireAuth, requireOwner } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload";


const router = Router();


// Public
router.get('/', listPublic);
router.get('/:slug', getBySlug);


// Protected (owner)
router.post('/', requireAuth, requireOwner, createBlog);
router.put('/:id', requireAuth, requireOwner, updateBlog);
router.delete('/:id', requireAuth, requireOwner, deleteBlog);
router.post("/", requireAuth, requireOwner, upload.single("image"), createBlog);
router.put("/:id", requireAuth, requireOwner, upload.single("image"), updateBlog);


export default router;
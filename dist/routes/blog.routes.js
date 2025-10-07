"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = (0, express_1.Router)();
// Public
router.get('/', blog_controller_1.listPublic);
router.get('/:slug', blog_controller_1.getBySlug);
// Protected (owner)
router.post('/', auth_middleware_1.requireAuth, auth_middleware_1.requireOwner, blog_controller_1.createBlog);
router.put('/:id', auth_middleware_1.requireAuth, auth_middleware_1.requireOwner, blog_controller_1.updateBlog);
router.delete('/:id', auth_middleware_1.requireAuth, auth_middleware_1.requireOwner, blog_controller_1.deleteBlog);
router.post("/", auth_middleware_1.requireAuth, auth_middleware_1.requireOwner, upload_1.default.single("image"), blog_controller_1.createBlog);
router.put("/:id", auth_middleware_1.requireAuth, auth_middleware_1.requireOwner, upload_1.default.single("image"), blog_controller_1.updateBlog);
exports.default = router;

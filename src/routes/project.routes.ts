import { Router } from "express";
import { listPublicProjects, getProjectBySlug, createProject, updateProject, deleteProject } from "../controllers/project.controller";
import { requireAuth, requireOwner } from "../middlewares/auth.middleware";


const router = Router();


router.get('/', listPublicProjects);
router.get('/:slug', getProjectBySlug);


router.post('/', requireAuth, requireOwner, createProject);
router.put('/:id', requireAuth, requireOwner, updateProject);
router.delete('/:id', requireAuth, requireOwner, deleteProject);


export default router;
import express from "express";
import aboutModel from "../models/about.model";
import { requireAuth, requireOwner } from "../middlewares/auth.middleware";

const router = express.Router();

// Get About info (public)
router.get("/", async (req, res) => {
  const about = await aboutModel.findOne();
  res.json(about);
});

// Create or update About info (admin)
router.post("/",requireAuth, requireOwner, async (req, res) => {
  const data = req.body;
  let about = await aboutModel.findOne();
  if (about) {
    about.set(data);
    await about.save();
  } else {
    about = await aboutModel.create(data);
  }
  res.json(about);
});

export default router;

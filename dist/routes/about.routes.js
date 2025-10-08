"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_model_1 = __importDefault(require("../models/about.model"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Get About info (public)
router.get("/", async (req, res) => {
    const about = await about_model_1.default.findOne();
    res.json(about);
});
// Create or update About info (admin)
router.post("/", auth_middleware_1.requireAuth, auth_middleware_1.requireOwner, async (req, res) => {
    const data = req.body;
    let about = await about_model_1.default.findOne();
    if (about) {
        about.set(data);
        await about.save();
    }
    else {
        about = await about_model_1.default.create(data);
    }
    res.json(about);
});
exports.default = router;

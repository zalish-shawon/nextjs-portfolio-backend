"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV !== "production")
    app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL, credentials: true }));
const limiter = (0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/blogs", blog_routes_1.default);
app.use("/api/projects", project_routes_1.default);
// Health check
app.get("/ping", (req, res) => res.json({ ok: true, ts: Date.now() }));
app.get('/', (_req, res) => {
    res.json({ 'message': 'API is running 🚀' });
});
// Error handler
app.use(error_middleware_1.errorHandler);
exports.default = app;

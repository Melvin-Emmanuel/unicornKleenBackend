"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const VerifyAdmin_1 = require("../utils/VerifyAdmin");
const multer_1 = require("../utils/multer");
const BlogController_1 = require("../controller/BlogController");
const router = express_1.default.Router();
router.route("/create-Blog").post(VerifyAdmin_1.verifyAdmin, multer_1.UploadBlog, BlogController_1.createBlogPost);
router.route("/getAllBLog").get(BlogController_1.getBlog);
exports.default = router;

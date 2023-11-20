import express from "express"
import { verifyAdmin } from "../utils/VerifyAdmin"
import { UploadBlog } from "../utils/multer"
import { createBlogPost, getBlog } from "../controller/BlogController"

const router = express.Router()

router.route("/create-Blog").post(verifyAdmin, UploadBlog, createBlogPost)
router.route("/getAllBLog").get(getBlog)
export default router



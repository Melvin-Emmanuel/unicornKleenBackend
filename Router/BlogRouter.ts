import express from "express"
import { verifyAdmin } from "../utils/VerifyAdmin"
import { UploadBlog } from "../utils/multer"
import { createBlogPost } from "../controller/BlogController"

const router = express.Router()

router.route("/create-Blog").post(verifyAdmin,UploadBlog,createBlogPost)
export default router



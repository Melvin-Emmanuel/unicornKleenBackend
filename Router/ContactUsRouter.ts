import express from "express"
import { CreateContactUs } from "../controller/ContactUSController"
const router = express.Router()
router.route("/contact-us").post(CreateContactUs)

export default router
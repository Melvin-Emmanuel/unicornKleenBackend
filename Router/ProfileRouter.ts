import express from "express"
import { UpdateProfile } from "../controller/ProfileController"
import {upload, uploaded} from "../utils/multer"

import { verifyUser } from "../utils/verifyUser"
const router = express.Router()


router.route("/update-Profile/:userID").put(verifyUser, upload,UpdateProfile)

export default router
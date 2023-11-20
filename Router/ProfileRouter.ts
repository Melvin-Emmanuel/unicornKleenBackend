import express from "express"
import { UpdateProfile } from "../controller/ProfileController"
import {upload} from "../utils/multer"

import { verifyUser } from "../utils/verifyUser"
const router = express.Router()


router.route("/update-Profile").put(verifyUser, upload,UpdateProfile)

export default router
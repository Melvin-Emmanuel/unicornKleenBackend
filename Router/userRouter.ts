import express from "express";
import {
  CreateAPPointment,
  createUser,
  userLogin,
} from "../controller/userController";
import { verifyUser } from "../utils/verifyUser";


const router = express.Router();
router.route("/reg-user").post(createUser);
router.route("/login-User").post(userLogin);
router
  .route("/create-Appointment/:userID")
  .post(verifyUser, CreateAPPointment);

export default router;

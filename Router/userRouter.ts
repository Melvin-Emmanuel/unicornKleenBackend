import express from "express";
import {
  CreateAPPointment,
  createUser,
  userLogin,
  userLogout,
} from "../controller/userController";
import { verifyUser } from "../utils/verifyUser";


const router = express.Router();
router.route("/reg-user").post(createUser);
router.route("/login-User").post(userLogin);
router
  .route("/create-Appointment/:userID")
  .post(CreateAPPointment);
  router.route("/logout").get(userLogout)

export default router;

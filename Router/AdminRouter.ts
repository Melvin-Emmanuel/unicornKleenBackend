import express from "express";
import {
  LoginAdmin,
  getAllUser,
  getAppointments,
  getSingleUSer,
  regAdmin,
} from "../controller/AdminContoller";
import { verifyAdmin } from "../utils/VerifyAdmin";

const router = express.Router();
router.route("/Admin-reg").post(regAdmin);
router.route("/Admin-Login").post(LoginAdmin);
router
  .route("/Admin-get-appointments").get(getAppointments)
  .get(verifyAdmin, getAppointments);
router.route("/Admin-get-all-users").get(verifyAdmin, getAllUser);
router.route("/Admin-get-Single-user").get(verifyAdmin,getSingleUSer)

export default router;

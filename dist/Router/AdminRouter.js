"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminContoller_1 = require("../controller/AdminContoller");
const VerifyAdmin_1 = require("../utils/VerifyAdmin");
const router = express_1.default.Router();
router.route("/Admin-reg").post(AdminContoller_1.regAdmin);
router.route("/Admin-Login").post(AdminContoller_1.LoginAdmin);
router
    .route("/Admin-get-appointments").get(AdminContoller_1.getAppointments)
    .get(VerifyAdmin_1.verifyAdmin, AdminContoller_1.getAppointments);
router.route("/Admin-get-all-users").get(VerifyAdmin_1.verifyAdmin, AdminContoller_1.getAllUser);
router.route("/Admin-get-Single-user").get(VerifyAdmin_1.verifyAdmin, AdminContoller_1.getSingleUSer);
router.route("/createWorker").post(VerifyAdmin_1.verifyAdmin, AdminContoller_1.createWorker);
exports.default = router;

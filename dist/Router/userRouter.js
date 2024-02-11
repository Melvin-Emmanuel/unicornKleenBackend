"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.route("/reg-user").post(userController_1.createUser);
router.route("/login-User").post(userController_1.userLogin);
router
    .route("/create-Appointment/:userID")
    .post(userController_1.CreateAPPointment);
router.route("/logout").get(userController_1.userLogout);
exports.default = router;

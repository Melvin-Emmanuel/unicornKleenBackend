"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProfileController_1 = require("../controller/ProfileController");
const multer_1 = require("../utils/multer");
const verifyUser_1 = require("../utils/verifyUser");
const router = express_1.default.Router();
router.route("/update-Profile").put(verifyUser_1.verifyUser, multer_1.upload, ProfileController_1.UpdateProfile);
exports.default = router;

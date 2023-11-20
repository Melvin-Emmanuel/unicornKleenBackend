"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContactUSController_1 = require("../controller/ContactUSController");
const router = express_1.default.Router();
router.route("/contact-us").post(ContactUSController_1.CreateContactUs);
exports.default = router;

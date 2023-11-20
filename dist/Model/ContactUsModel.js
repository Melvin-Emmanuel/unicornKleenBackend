"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ContactSchema = new mongoose_1.default.Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    PhoneNumber: {
        typpe: String
    },
    Text: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Contact-Us", ContactSchema);

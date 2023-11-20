"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    CompanyName: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("admin", AdminSchema);

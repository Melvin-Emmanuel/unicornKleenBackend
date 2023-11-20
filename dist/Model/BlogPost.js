"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    Picture: {
        type: String
    },
    Title: {
        type: String
    },
    Text: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("BlogPost", BlogSchema);

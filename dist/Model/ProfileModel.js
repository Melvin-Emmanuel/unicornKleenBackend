"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProfileSchema = new mongoose_1.default.Schema({
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    Email: {
        type: String
    },
    Address: { type: String },
    Bio: {
        type: String
    }, Native: {
        type: String
    },
    Cv: {
        type: String
    },
    Degree: {
        type: String
    },
    Avatar: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("profile", ProfileSchema);

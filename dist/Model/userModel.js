"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AppointmentSChema = new mongoose_1.default.Schema({
    Date: {
        type: Date,
    },
    Desc: {
        type: String,
    },
    Location: {
        type: String,
    },
    Status: {
        type: String,
    },
    Duration: {
        type: String,
    },
    Profile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Profile",
    },
});
const userSchema = new mongoose_1.default.Schema({
    FullName: {
        type: String,
    },
    Email: {
        type: String,
    },
    Password: {
        type: String,
    },
    Profile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "profile",
    },
    Role: {
        type: String,
        enum: ["User", "Worker"]
    },
    Appointnment: {
        type: [
            {
                Title: { Type: String },
                Location: { type: String },
                Status: {
                    type: String,
                    enum: ["Pending", "completed", "Rejected"],
                },
                Duration: {
                    type: String,
                },
            },
        ],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("user", userSchema);

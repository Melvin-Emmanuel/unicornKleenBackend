"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./Router/userRouter"));
const AdminRouter_1 = __importDefault(require("./Router/AdminRouter"));
const ProfileRouter_1 = __importDefault(require("./Router/ProfileRouter"));
const ContactUsRouter_1 = __importDefault(require("./Router/ContactUsRouter"));
const BlogRouter_1 = __importDefault(require("./Router/BlogRouter"));
const MainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.get("/api/v1", (req, res) => {
        res.status(200).json({
            message: "api is running"
        });
    });
    app.use("/api/v1", userRouter_1.default);
    app.use("/api/v1", AdminRouter_1.default);
    app.use("/api/v1", ProfileRouter_1.default);
    app.use("/api/v1", ContactUsRouter_1.default);
    app.use("/api/v1", BlogRouter_1.default);
};
exports.MainApp = MainApp;

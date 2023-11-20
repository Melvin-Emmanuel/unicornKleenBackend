"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./Database/db");
const mainApp_1 = require("./mainApp");
const app = (0, express_1.default)();
const port = 5200;
app.use(express_1.default.json());
(0, mainApp_1.MainApp)(app);
const server = app.listen(port, () => {
    console.log("server listening on port ", port);
});
process.on("unhandledRejection", () => {
    console.log("unhandled rejection");
    server.close(() => {
        process.exit(1);
    });
});
process.on("uncaughtException", () => {
    console.log("uncaught exception");
    server.close(() => {
        process.exit(1);
    });
});

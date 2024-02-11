"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb://0.0.0.0:27017/unicornkleenbackend";
const url2 = "mongodb+srv://emmanulmelv:0n4DIP5zo5tLVmn3@cluster0.r6gtk6f.mongodb.net/";
const Db = mongoose_1.default
    .connect(url)
    .then(() => {
    console.log("connected to database");
})
    .catch(() => {
    console.log("could not connect to database");
});
exports.default = Db;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: "djcjonq79",
    api_key: "743338794996375",
    api_secret: "ouWYRaS1hz_eaPAnEg3rvbdVIzQ",
});
exports.default = cloudinary;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlog = exports.createBlogPost = void 0;
const BlogPost_1 = __importDefault(require("../Model/BlogPost"));
const Cloudinary_1 = __importDefault(require("../utils/Cloudinary"));
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Picture, Title, Text } = req.body;
        if (!Title || !Text) {
            return res.status(401).json({
                message: "you must fill all blog post fields"
            });
        }
        const ImageURl = yield Cloudinary_1.default.uploader.upload(req.file.path);
        const Data = yield BlogPost_1.default.create({
            Picture: ImageURl.secure_url,
            Title,
            Text,
        });
        return res.status(201).json({
            message: "Blog post successfully created",
            Data: Data
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.createBlogPost = createBlogPost;
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield BlogPost_1.default.find();
        return res.status(200).json({
            message: "blog post gotten",
            result: data,
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.getBlog = getBlog;

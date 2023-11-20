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
exports.CreateContactUs = void 0;
const ContactUsModel_1 = __importDefault(require("../Model/ContactUsModel"));
const CreateContactUs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Email, PhoneNumber, Text } = req.body;
        if (!Name || !Email || !PhoneNumber || !Text) {
            return res.status(401).json({
                message: "all fields must be filled"
            });
        }
        const data = yield ContactUsModel_1.default.create({
            Name,
            Email,
            PhoneNumber,
            Text,
        });
        return res.status(201).json({
            message: "submitted to database",
            data: data
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.CreateContactUs = CreateContactUs;

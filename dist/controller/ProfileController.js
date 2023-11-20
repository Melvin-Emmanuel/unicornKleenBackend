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
exports.UpdateProfile = void 0;
const ProfileModel_1 = __importDefault(require("../Model/ProfileModel"));
const Cloudinary_1 = __importDefault(require("../utils/Cloudinary"));
const userModel_1 = __importDefault(require("../Model/userModel"));
const UpdateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.User;
        const checkuser = yield userModel_1.default.findById(userID);
        if (!checkuser) {
            return res.status(404).json({
                message: "user does not exist",
            });
        }
        const { FirstName, LastName, Address, Bio, Degree } = req.body;
        if (!FirstName || !LastName || !Address || !Bio || !Degree) {
            return res.status(401).json({
                message: "fields cannot be empty",
            });
        }
        const ImageURl = yield Cloudinary_1.default.uploader.upload(req.file.path);
        const Data = yield ProfileModel_1.default.findByIdAndUpdate(userID, {
            FirstName,
            LastName,
            Address,
            Bio,
            Degree,
            Avatar: ImageURl.secure_url,
        }, {
            new: true,
        });
        return res.status(404).json({
            message: "profile updated successfully",
            result: Data
        });
    }
    catch (error) {
        return res.status(200).json({
            message: error.message
        });
    }
});
exports.UpdateProfile = UpdateProfile;

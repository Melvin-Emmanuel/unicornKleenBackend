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
exports.getAppointments = exports.getSingleUSer = exports.LoginAdmin = exports.regAdmin = exports.getAllUser = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const AdminModel_1 = __importDefault(require("../Model/AdminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const checkuser = await userModel.findOne({ _id: req.params.userId })
    // if (!checkuser) {
    //     return res.status(401).json({
    //         message:"user does not exist "
    //     })
    // }
    const data = yield userModel_1.default.find();
    return res.status(200).json({
        message: "all user gotten successfully",
        result: data
    });
});
exports.getAllUser = getAllUser;
const regAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { CompanyName, Email, Password } = req.body;
        if (!CompanyName || !Email || !Password)
            return res.status(410).json({
                message: "all field required",
                success: 0
            });
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(Password, salt);
        const create = yield AdminModel_1.default.create({
            CompanyName, Email, Password: hash
        });
        return res.status(201).json({
            message: "Admin account created successfully",
            result: create
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "error"
        });
    }
});
exports.regAdmin = regAdmin;
const LoginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(500).json({ message: "please fill all fields" });
        }
        const checkEmail = yield userModel_1.default.findOne({ Email: Email });
        console.log(checkEmail);
        if (checkEmail) {
            const checkPassword = yield bcrypt_1.default.compare(Password, checkEmail.Password);
            if (checkPassword) {
                const token = jsonwebtoken_1.default.sign({
                    _id: checkEmail._id,
                    FullName: checkEmail.FullName,
                    Role: checkEmail.Role,
                }, "melvinmelasiemmanuelAdminVerification", { expiresIn: "5d" });
                console.log(token);
                res.cookie("sessionId", token);
                console.log(req.headers["cookie"]);
                return res.status(200).json({
                    success: 1,
                    message: "login successful",
                });
            }
            else {
                return res.status(500).json({ message: "incorrect password" });
            }
        }
        else {
            return res.status(500).json({ message: "user not found" });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
exports.LoginAdmin = LoginAdmin;
const getSingleUSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.User._id;
        console.log(userID);
        const checkUser = yield userModel_1.default.findById({ _id: userID }).populate({
            path: "Profile",
            select: "Email Address Native Degree"
        });
        console.log(checkUser);
        if (!checkUser) {
            return res.status(404).json({
                message: "user does not exist"
            });
        }
        return res.status(200).json({
            result: checkUser
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error" + error.message
        });
    }
});
exports.getSingleUSer = getSingleUSer;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userModel_1.default.find();
    console.log(data);
    if (!data) {
        res.status(404).json({
            message: "users not found",
        });
    }
    const gotten = new Array;
    for (const user of data) {
        if (user.Appointnment && user.Appointnment.length > 0) {
            gotten.push(...user.Appointnment);
        }
    }
    console.log(data);
    return res.status(200).json({
        message: "appointment gotten",
        result: gotten
    });
});
exports.getAppointments = getAppointments;

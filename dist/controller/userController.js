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
exports.userLogin = exports.CreateAPPointment = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../Model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ProfileModel_1 = __importDefault(require("../Model/ProfileModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FullName, Email, Password, Role } = req.body;
        if (!Email || !Password || !FullName) {
            return res.status(401).json({
                Message: "All fields required",
            });
        }
        const checkemail = yield userModel_1.default.findOne({ Email: Email });
        if (checkemail) {
            return res.status(401).json({
                message: "email already in use",
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedpassword = yield bcrypt_1.default.hash(Password, salt);
        const UserData = yield userModel_1.default.create({
            FullName,
            Email,
            Password: hashedpassword,
            Role
        });
        const createProfile = yield ProfileModel_1.default.create({
            _id: UserData._id,
            FirstName: "",
            LastName: "",
            Address: "",
            Email: "",
            Degree: "",
            Native: "",
            Bio: "",
            Avatar: "",
            Cv: ''
        });
        UserData.Profile = createProfile._id;
        UserData.save();
        return res.status(201).json({
            message: "registaration successful",
            success: 1,
            result: UserData,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "unable to create user",
            reason: error.message,
        });
    }
});
exports.createUser = createUser;
const CreateAPPointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const checkUser = yield userModel_1.default.findOne({ _id: userID });
        console.log(checkUser);
        if (!checkUser) {
            return res.status(404).json({
                message: "user does not exist"
            });
        }
        if ((checkUser === null || checkUser === void 0 ? void 0 : checkUser.Role.toLowerCase()) === "worker") {
            return res.status(403).json({
                message: "permission denied",
            });
        }
        const { Title, Location } = req.body;
        if (!Title || !Location) {
            return res.status(401).json({
                message: "fields cannot be empty",
            });
        }
        const newAppoint = {
            Date: new Date(),
            Title: Title,
            Location: Location,
            Status: "Pending",
            Duration: "2 hours",
        };
        checkUser === null || checkUser === void 0 ? void 0 : checkUser.Appointnment.push(newAppoint);
        // console.log(checkUser?.Appointnment);
        yield (checkUser === null || checkUser === void 0 ? void 0 : checkUser.save());
        return res.status(201).json({
            message: `Appointment created with ${checkUser === null || checkUser === void 0 ? void 0 : checkUser.FullName}`,
            appointmentStatus: newAppoint.Status,
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.CreateAPPointment = CreateAPPointment;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                const token = jsonwebtoken_1.default.sign({ _id: checkEmail._id, FullName: checkEmail.FullName, Role: checkEmail.Role }, "melvinmelasiemmanuel", { expiresIn: "5d" });
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
        return res.status(404).json({ message: error.message });
    }
});
exports.userLogin = userLogin;

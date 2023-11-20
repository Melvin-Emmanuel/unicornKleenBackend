import userModel from "../Model/userModel";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import ProfileModel from "../Model/ProfileModel";
import Jwt from "jsonwebtoken";
import { AnyError } from "mongodb";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { FullName, Email, Password,Role } = req.body;
    if (!Email || !Password || !FullName) {
      return res.status(401).json({
        Message: "All fields required",
      });
    }

    const checkemail = await userModel.findOne({ Email: Email });

    if (checkemail) {
      return res.status(401).json({
        message: "email already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(Password, salt);

    const UserData = await userModel.create({
      FullName,
      Email,
        Password: hashedpassword,
        Role
        
      
    });
    const createProfile = await ProfileModel.create({
      _id: UserData._id,
      FirstName: "",
      LastName: "",
        Address: "",
        Email: "",
        Degree: "",
        Native:"",
        Bio: "", 
        Avatar: "",
      Cv:''

    });

    UserData.Profile = createProfile._id;
    UserData.save();
    return res.status(201).json({
      message: "registaration successful",
      success: 1,
      result: UserData,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "unable to create user",
      reason: error.message,
    });
  }
};
export const CreateAPPointment= async(req: Request, res: Response):Promise<Response> => {
try {
    const { userID } = req.params;
    const checkUser:any = await userModel.findOne({ _id: userID });
    console.log(checkUser);
    if (!checkUser) {
        
        return res.status(404).json({
            message:"user does not exist"
        })
    }

    if (checkUser?.Role.toLowerCase() === "worker") {
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
  interface getdata {
    Date: Date,
    Title: string,
    Location: string,
    Status: string,
    Duration: string
  }
    const newAppoint:getdata = {
      Date: new Date(),
      Title: Title,
      Location: Location,
      Status: "Pending",
      Duration: "2 hours",
    };

  checkUser?.Appointnment.push(newAppoint);
  // console.log(checkUser?.Appointnment);
    await checkUser?.save();
    return res.status(201).json({
      message: `Appointment created with ${checkUser?.FullName}`,
      appointmentStatus: newAppoint.Status,
    });  
} catch (error:any) {
   return  res.status(401).json({
        message:error.message
    })
    
}
}
export const userLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(500).json({ message: "please fill all fields" });
    }
    const checkEmail: any = await userModel.findOne({ Email: Email });
    console.log(checkEmail);
    if (checkEmail) {
      const checkPassword = await bcrypt.compare(Password, checkEmail.Password);
      if (checkPassword) {
        const token: any = Jwt.sign(
          { _id: checkEmail._id, FullName: checkEmail.FullName,Role:checkEmail.Role},
          "melvinmelasiemmanuel",
          { expiresIn: "5d" }
        );
        console.log(token);
        res.cookie("sessionId", token);
        console.log(req.headers["cookie"]);
        return res.status(200).json({
          success: 1,
          message: "login successful",
        });
      } else {
        return res.status(500).json({ message: "incorrect password" });
      }
    } else {
      return res.status(500).json({ message: "user not found" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
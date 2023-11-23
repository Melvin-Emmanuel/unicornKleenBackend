import express, { Request, Response } from "express"
import userModel from "../Model/userModel"
import AdminModel from "../Model/AdminModel"
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken"

export const getAllUser = async (req: Request, res: Response): Promise<Response> => {
    // const checkuser = await userModel.findOne({ _id: req.params.userId })
    // if (!checkuser) {
    //     return res.status(401).json({
    //         message:"user does not exist "
    //     })
    // }

    const data = await userModel.find()
    
    return res.status(200).json({
        message: "all user gotten successfully",
        result:data
    })
}

export const regAdmin = async (req: Request, res: Response): Promise<Response>=>{
    try {
        const { CompanyName, Email, Password } = req.body
        if (!CompanyName || !Email || !Password)
            return res.status(410).json({
                message: "all field required",
                success: 0

            })
        
        const salt = await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(Password,salt)
        const create = await AdminModel.create({
            CompanyName, Email, Password:hash
        })
        return res.status(201).json({
            message: "Admin account created successfully",
            result:create
        })
    } catch (error) {
        return res.status(401).json({
           message: "error" 
       }) 
    }
}
export const LoginAdmin = async (req: Request, res: Response): Promise<Response>=>{
    try {
        const { Email, Password } = req.body
         if (!Email || !Password) {
           return res.status(500).json({ message: "please fill all fields" });
         }
         const checkEmail: any = await userModel.findOne({ Email: Email });
         console.log(checkEmail);
         if (checkEmail) {
           const checkPassword = await bcrypt.compare(
             Password,
             checkEmail.Password
           );
           if (checkPassword) {
             const token: any = Jwt.sign(
               {
                 _id: checkEmail._id,
                 FullName: checkEmail.FullName,
                 Role: checkEmail.Role,
               },
               "melvinmelasiemmanuelAdminVerification",
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

    } catch (error:any) {
      return   res.status(404).json({
           message:error.message
       }) 
    }
}
export const getSingleUSer = async (req:Request|any, res: Response): Promise<Response>=>{
    try {
      const userID = req.User._id
      console.log(userID)
        const checkUser = await userModel.findById({ _id: userID }).populate({
            path: "Profile",
            select:"Email Address Native Degree"
        })
        console.log(checkUser)
        if (!checkUser) {
            return res.status(404).json({
                message:"user does not exist"
            })
        }

        return res.status(200).json({
            result:checkUser
        })
    } catch (error:any) {
        return res.status(404).json({
            message:"error"+error.message
        })
    }
}

export const getAppointments = async (req: Request, res: Response): Promise<Response> => {
  const data = await userModel.find()
  console.log(data)
    if (!data) {
      res.status(404).json({
        message: "users not found",
      });
    }
    const gotten =new Array
    for (const user of data) {
        if (user.Appointnment && user.Appointnment.length > 0) {
          gotten.push(...user.Appointnment)
        }
   }
    console.log(data)
   
    


    return res.status(200).json({
        message: "appointment gotten",
        result:gotten
    })
}
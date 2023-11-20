import e from "express";
import express, { Request, Response } from "express";
import ProfileModel from "../Model/ProfileModel";
import cloudinary from "../utils/Cloudinary";
import userModel from "../Model/userModel";
import { AnyError } from "mongodb";

export const UpdateProfile = async (req:any, res: Response):Promise<Response> => {
  try {
    const  userID =req.User 
    
    const checkuser = await userModel.findById(userID);
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
    const ImageURl = await cloudinary.uploader.upload(req.file.path);
    const Data = await ProfileModel.findByIdAndUpdate(
      userID,
      {
        FirstName,
        LastName,
        Address,
        Bio,
          Degree,
        
        Avatar: ImageURl.secure_url,
      },
      {
        new: true,
      }
      )
      return res.status(404).json({
          message: "profile updated successfully",
          result:Data
      })
  } catch (error:any) {
      return res.status(200).json({
        message:error.message
    })
  }
    
};

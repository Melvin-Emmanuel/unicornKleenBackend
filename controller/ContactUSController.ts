import express, { Request, Response } from "express"
import ContactUsModel from "../Model/ContactUsModel"

export const CreateContactUs = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { Name, Email, PhoneNumber, Text } = req.body 
        if (!Name ||!Email || !PhoneNumber || !Text) {
            return res.status(401).json({
                message:"all fields must be filled"
            })
        }
        const data = await ContactUsModel.create({
          Name,
          Email,
          PhoneNumber,
          Text,
        });
        return res.status(201).json({
            message: "submitted to database",
            data:data
        })
    } catch (error:any) {
        return res.status(401).json({
           message:error.message
       }) 
    }
}
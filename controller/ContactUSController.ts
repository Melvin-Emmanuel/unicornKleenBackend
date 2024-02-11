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
           const checkExisting = await ContactUsModel.findOne({ Email }).sort({
             CreatedAt: -1,
           });

           if (checkExisting) {
             const timeDifference =Date.now()
              //  Date.now() - checkExisting?.createdAt.getTime();
             const submissionInterval = 24 * 60 * 60 * 1000; // 24 hours

             if (timeDifference < submissionInterval) {
               return res.status(400).json({
                 error:
                   "Too frequent submissions. Please wait before submitting again.",
               });
             }
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
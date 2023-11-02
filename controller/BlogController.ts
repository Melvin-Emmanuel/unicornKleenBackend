import express, { Request, Response } from "express"
import BlogPost from "../Model/BlogPost"
import cloudinary from "../utils/Cloudinary"
import path from "path"

export const createBlogPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { Picture, Title, Text } = req.body
        if ( !Title || !Text) {
            return res.status(401).json({
                message: "you must fill all blog post fields"
                
            })
        
        } 
            const ImageURl= await cloudinary.uploader.upload(req.file.path)
            const Data = await BlogPost.create({
              Picture: ImageURl.secure_url,
              Title,
              Text,
            });
            return res.status(201).json({
                message: "Blog post successfully created",
                Data:Data
            })
    } catch (error:any) {
        return res.status(401).json({
          message:error.message
      })  
    }
}
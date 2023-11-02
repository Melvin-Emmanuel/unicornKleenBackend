import express, { Application } from "express";
import cors from "cors";
import userRouter from "./Router/userRouter"
import AdminRouter from "./Router/AdminRouter"
import ProfileRouter from "./Router/ProfileRouter"
import ContactusRouter from "./Router/ContactUsRouter"
import BlogRouter from "./Router/BlogRouter"


export const MainApp = (app: Application) => {
    app.use(express.json())
    app.use(cors())
    app.get("/api/v1", (req, res) => {
        res.status(200).json({
            message:"api is running"
        })
    })
    app.use("/api/v1", userRouter);
    app.use("/api/v1", AdminRouter)
    app.use("/api/v1", ProfileRouter)
    app.use("/api/v1", ContactusRouter)
    app.use("/api/v1",BlogRouter)
}
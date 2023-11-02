import express, { Application } from "express"
import "./Database/db"
import { MainApp } from "./mainApp"


const app: Application = express()
const port = 5200
app.use(express.json())
MainApp(app)
const server = app.listen(port, () => {
    console.log("server listening on port ",port)
})
process.on("unhandledRejection", () => {
  console.log("unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
});
process.on("uncaughtException", () => {
  console.log("uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});
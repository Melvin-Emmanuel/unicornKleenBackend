import mongoose from "mongoose";

const url = "mongodb://0.0.0.0:27017/unicornkleenbackend";
const url2 =
  "mongodb+srv://emmanulmelv:0n4DIP5zo5tLVmn3@cluster0.r6gtk6f.mongodb.net/";

const Db = mongoose
  .connect(url2)
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("could not connect to database");
  });

export default Db;

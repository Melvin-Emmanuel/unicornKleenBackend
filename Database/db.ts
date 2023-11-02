import mongoose from "mongoose";

const url = "mongodb://0.0.0.0:27017/unicornkleenbackend";

const Db = mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("could not connect to database");
  });

export default Db;

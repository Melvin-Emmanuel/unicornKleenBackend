import mongoose from "mongoose";

interface Profile {
  FirstName: string;
  LastName: string;
  Email: string;
  Bio: string;
  Native: string;
  Address: string;
    Avatar: string;
    Cv?: string
    Degree?:string
}
interface IProfile extends Profile, mongoose.Document {}

const ProfileSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
        Email: {
       type:String
        },
        Address: 
            { type: String },
        Bio:{
            type:String
        }, Native: {
            type:String
        },
        Cv: {
            type:String
        },
        Degree: {
            type:String
        },
        
    Avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("profile", ProfileSchema);

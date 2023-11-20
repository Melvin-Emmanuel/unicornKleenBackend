import mongoose from "mongoose"

interface user {
  FullName: string;
  Email: string;
  Password: string;
  Profile: {};
  Role: string;
  Appointnment: [{}];
}
interface Iuser extends user, mongoose.Document { }

const AppointmentSChema = new mongoose.Schema({
  Date: {
    type:Date
  },
  Desc: {
    type:String
  },
  Location: {
    type:String
  },
  Status: {
    type:String
  },
  Duration: {
    type:String
  }, 
  Profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Profile"
  }
})

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    Profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
    Role: {
      type: String,
    },
    Appointnment: {
      type: [
        {
          Title: { Type: String },
          Location: { type: String },
          Status: {
            type: String,
            enum: ["Pending", "completed", "Rejected"],
          },
          Duration: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model<Iuser>("user", userSchema);

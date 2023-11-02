import mongoose from 'mongoose'
interface Admin{
    CompanyName: string
    Email: string
    Password:string
}

interface IAdmin extends Admin, mongoose.Document{ }

const AdminSchema = new mongoose.Schema({
    CompanyName: {
        type:String
    },
    Email: {
        type:String
    },
    Password: {
        type:String
    }
}, { timestamps: true })

export default mongoose.model<IAdmin>("admin", AdminSchema)
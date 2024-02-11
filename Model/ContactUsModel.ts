import mongoose from "mongoose"

interface Contact{
    Name: string
    Email: string
    PhoneNumber: string
    Text:String
}

interface IContact extends Contact, mongoose.Document{ }


const ContactSchema = new mongoose.Schema({
    Name: {
        type:String
    },
    Email: {
        type:String
    },
    PhoneNumber: {
        type:String
    },
    Text: {
        type:String
    }
},{timestamps:true})


export default mongoose.model<IContact>("Contact-Us", ContactSchema
)
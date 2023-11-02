import mongoose from "mongoose"

interface Blog{
    Picture: string
    Title: string
    Text:string
}

interface IBlog extends Blog, mongoose.Document{ }

const BlogSchema = new mongoose.Schema({
    Picture: {
        type:String
    },
    Title: {
        type:String
    },
    Text: {
        type:String
    }
},
{timestamps:true})
export default mongoose.model("BlogPost",BlogSchema)

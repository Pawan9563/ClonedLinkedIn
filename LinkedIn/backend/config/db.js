import mongoose from "mongoose"

const connectDb=async()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    }
    catch(error){
        console.log("Error in db connection")
    }
}

export default connectDb
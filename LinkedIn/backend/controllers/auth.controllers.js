import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
export const signUp = async (req,res)=>{
    try{
        let {firstName,lastName,userName,email,password} = req.body;
        let existEmail = await User.findOne({email})
        if (existEmail){
            return res.status(400).json({message: "email already exists"})
        }
        let existUsername = await User.findOne({userName})
        if (existUsername){
            return res.status(400).json({message: "User Name already taken"})
        }
        
        let hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            firstName:firstName,
            lastName,
            userName,
            email,
            password: hashedPassword
        })

        res.status(201).json(user)
    }
    catch(error){
        res.status(500).json({message:error})
    }
}
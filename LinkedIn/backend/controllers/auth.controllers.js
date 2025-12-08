import genToken from "../config/token.js"
import User from "../models/user.models.js"
import bcrypt from "bcryptjs"

export const signUp = async (req,res)=>{
    try{
        let {firstName, lastName, userName, email,password} = req.body
        let existEmail = await User.findOne({email})
        if (existEmail){
            return res.status(400).json({message:"Email already exists"})
        }
        let existUserName = await User.findOne({userName})
        if (existUserName){
            return res.status(400).json({message:"User name already exists"})
        }
        if (password.length<8){
            return res.status(400).json({message:"Weak Password"})
        }
        let hashedPass =await bcrypt.hash(password,10)
        const user= await User.create({
            firstName,
            lastName,
            userName,
            email,
            password : hashedPass
        })
        let token = await genToken(user._id)
        res.cookie("Token",token,{
            httpOnly:true,
            maxAge : 7*24*60*60*1000,
            sameSite:"strict",
            secure: process.env.NODE_ENVIRONMENT == "production"
        })
        return res.status(201).json({message : "User created Successfully",user:user})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

export const login = async (req,res)=>{
    try{
        let {email,password} = req.body
        let user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message:"Email doesnt exists"})
        }
        let isMatched =await bcrypt.compare(password,user.password)
        if (!isMatched){
            return res.status(400).json({message:"Incorrect password"})
        }
        let token = await genToken(user._id)
        res.cookie("Token",token,{
            httpOnly:true,
            maxAge : 7*24*60*60*1000,
            sameSite:"strict",
            secure: process.env.NODE_ENVIRONMENT == "production"
        })
        return res.status(201).json({message : "User Login Successfully",user:user})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}


export const logOut = async (req,res) =>{
    try{
        res.clearCookie("token")
        return res.status(400).json({message:"Logout Successful"})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}
import User from "../models/user.models.js"

const userController = async (req,res) =>{
    try{
        let user = await User.findById(req.userId).select("-password")
        if (!user){
            return res.status(400).json({message:"User Details not found"})
        } 
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(401).json({message:"Backend problem: Cant find user"})
    }

}
export default userController
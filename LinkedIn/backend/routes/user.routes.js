import express from "express"
import isAuth from "../middlewares/isAuth.js"
import userController from "../controllers/user.controllers.js"

let userRouter = express.Router()
userRouter.get("/currentUser",isAuth,userController)

export default userRouter
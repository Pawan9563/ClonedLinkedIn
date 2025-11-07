import express from "express"
import { signUp } from "../controllers/auth.controllers"
let authRouter = express.Router()

authRouter.post("/signup",signUp)
export default authRouter;
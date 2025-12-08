import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
dotenv.config()
let app = express()
let port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(port,()=>{
    connectDb()
    console.log("Server started");
})
import React,{useState} from 'react'
import logo from "../assets/logo.svg"
import axios from 'axios'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Login(){
    let {serverUrl} = useContext(authDataContext)
    let [show,setShow] = useState(false)
    const { userData, setUserData } = useContext(userDataContext)
    
    let navigate = useNavigate()
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [loading,setLoading] = useState(false)
    let [err,setErr] = useState("")
    
    const checkLogin= async (e)=>{
        e.preventDefault();
        setLoading(true)
        setErr("")
        try{
            let res = await axios.post(serverUrl+"/api/auth/login",{
                email,
                password
            },{withCredentials:true})
            setUserData(res.data)
            navigate("/")
            setEmail("")
            setPassword("")
            setLoading(false)
            console.log(res.data);
        }
        catch(error){
            console.log(error.response.data.message);
            setErr(error?.response?.data?.message || "Login failed")
            setLoading(false)
        }
    }

    return(
        <>
            <div className="w-full h-screen flex flex-col items-center justify-start">
                <div className='p-[30px] ld:p-[35px] w-full flex items-center'>
                    <img src={logo} alt="Logo" />
                </div>
                <form className=" w-[500px] h-[400px] mt-[30px] shadow-xl flex flex-col p-[25px] gap-3" onSubmit={checkLogin}>
                    <h1 className="text-[30px] font-semibold flex flex-col items-center py-[20px]">SIGN IN</h1>
                    <input type="email" placeholder='Email' required className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <div className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md relative'>
                        <input type={show?"text":"password"} placeholder='Password' required className='border-none w-full h-full outline-none' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <span className='text-blue-500 cursor-pointer absolute right-[15px] top-[10px]' onClick={()=>setShow(prev=>!prev)}>{show?"hide":"show"}</span>
                    </div>
                    <br />
                    {err && <p className="text-red-500 text-center">{err}</p>}
                    <button className="w-full h-[50px] bg-blue-500 text-white rounded-full" disabled={loading}>{loading?"Signing in...":"Sign In"}</button>
                    <p className="text-center">Want to create a new account? <a href="/signup" className="text-blue-400">Sign Up</a></p>
                </form>
            </div>
        </>
    )
}
export default Login

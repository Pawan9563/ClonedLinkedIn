import React, {useContext, useState} from 'react'
import logo from '../assets/logo.svg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
function Signup(){
    let [show,setShow] = useState(false)
    let {serverUrl} = useContext(authDataContext)
    const {userData,setUserData} = useContext(userDataContext)

    let navigate = useNavigate()
    let [firstName,setFirstName] = useState("")
    let [lastName,setLastName] = useState("")
    let [userName,setUserName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [loading,setLoading] = useState(false)
    let [err,setErr] = useState("")

    const handleSignUp =async(e) =>{
        e.preventDefault();
        try{
            let result = await axios.post(serverUrl+"/api/auth/signup",
                {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password
                },{withCredentials:true}
            )
            setUserData(result.data)
            navigate("/")
            setFirstName("")
            setLastName("")
            setUserName("")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")
            console.log("Signup successful:", result.data);

        }
        catch(error){
            console.log("Error details:", error.response?.data);
            setErr(error.response.data.message)
            setLoading(false)
        }
    }
    return(
        <>
            <div className="w-full h-screen flex flex-col items-center justify-start">
                <div className='p-[30px] ld:p-[35px] w-full flex items-center'>
                    <img src={logo} alt="Logo" />
                </div>
                <form className=" w-[300px] h-[600px] md:shadow-xl flex flex-col justify-center gap-[10px] p-[15px]" onSubmit={handleSignUp}>
                    <h1 className='text-gray-800 font-semibold text-[30px] mb-[30px]'>Sign Up</h1>
                    <input type="text" placeholder='firstname' required className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                    <input type="text" placeholder='lastname' required className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                    <input type="text" placeholder='username' required className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                    <input type="email" placeholder='email' required className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <div className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md relative'>
                        <input type={show?"text":"password"} placeholder='password' required className='border-none w-full h-full outline-none' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <span className='text-blue-500 cursor-pointer absolute right-[15px] top-[10px]' onClick={()=>setShow(prev=>!prev)}>{show?"hide":"show"}</span>
                    </div>
                    
                    {err && <p>{err}</p>}
                    <button className='w-full h-[50px] bg-blue-500 rounded-3xl text-white mt-[30px]' onClick={()=>{
                        if (firstName != "" || lastName != "" || userName != "" || email != "" || password != ""){
                            setLoading(true)
                        }
                        }}>{loading?"loading":"Sign Up"}</button>
                    <p className='text-center'>Already have an account? <a href="/login" className="text-blue-500 cursor-pointer">Sign In</a></p>
                </form>
            </div>
        </>
    )
}
export default Signup
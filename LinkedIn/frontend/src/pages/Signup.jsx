import React, {useState} from 'react'
import logo from '../assets/logo.svg'
function Signup(){
    let [show,setShow] = useState(false)
    return(
        <>
            <div className="w-full h-screen flex flex-col items-center justify-start">
                <div className='p-[30px] ld:p-[35px] w-full flex items-center'>
                    <img src={logo} alt="Logo" />
                </div>
                <form className=" w-[300px] h-[600px] md:shadow-xl flex flex-col justify-center gap-[10px] p-[15px]">
                    <h1 className='text-gray-800 font-semibold text-[30px] mb-[30px]'>Sign Up</h1>
                    <input type="text" placeholder='firstname' required className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md'/>
                    <input type="text" placeholder='lastname' required className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md'/>
                    <input type="text" placeholder='username' required className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md'/>
                    <input type="email" placeholder='email' required className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md'/>
                    <div className='border-2 h-[50px] w-full text-[18px] border-gray-600 text-gray-800 px-[20px] py-[10px] rounded-md relative'>
                        <input type={show?"text":"password"} placeholder='password' required className='border-none w-full h-full outline-none'/>
                        <span className='text-blue-500 cursor-pointer absolute right-[15px] top-[10px]' onClick={()=>setShow(prev=>!prev)}>{show?"hide":"show"}</span>
                    </div>
                    
                    <button className='w-full h-[50px] bg-blue-500 rounded-3xl text-white mt-[30px]'>Sign Up</button>
                    <p className='text-center'>Already have an account? <a href="/login" className="text-blue-500 cursor-pointer">Sign In</a></p>
                </form>
            </div>
        </>
    )
}
export default Signup
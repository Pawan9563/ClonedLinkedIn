import React, { useContext, useEffect, useState } from 'react'
import linkedInLogo from '../assets/linkedInLogo.png'
import { IoSearchSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import default_dp from "../assets/default_dp.webp"
import { userDataContext } from '../context/UserContext';
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function NavBar (){
    let [activeSearch, setActiveSearch] = useState(false)
    let {userData,setUserData} = useContext(userDataContext)
    let [profileOpen, setProfileOpen] = useState(false)
    let navigate = useNavigate()
    // useEffect(()=>{                                           Just to check the userObj
    //     console.log(userData)
    // },[userData])
    let {serverUrl} = useContext(authDataContext)
    const userSignOut =async ()=>{
        try{
            let res= await axios.post(serverUrl+"/api/auth/logout",{},{withCredentials:true})
            console.log(res);
            setUserData(null)
            navigate("/login")
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <>
            <div className="w-full h-[80px] bg-white fixed top-0 shadow-lg flex justify-between pl-3 pr-3 md:justify-around items-center">
                <div className='flex justify-center items-center gap-[10px]'>
                    <div>
                        <img src={linkedInLogo} alt="Logo" className='w-[50px] h-[50px]' onClick ={()=>{
                            setActiveSearch(false)
                        }}></img>
                    </div>
                    {!activeSearch && <div><IoSearchSharp className='w-[20px] h-[20px] text-gray-600 lg:hidden' onClick={()=>{setActiveSearch(activeSearch=>!activeSearch)}}/></div>}  
                    <div>
                        <form className={`${!activeSearch?"hidden":"flex"} lg:flex items-center bg-[#eeece2] p-[5px] gap-[10px] rounded-md `}>
                            <div><IoSearchSharp className='w-[20px] h-[20px] text-gray-600'/></div>
                            <input type="text" className="w-[170px] md:w-[300px] h-[20px] bg-[#eeece2] outline-none border-0" placeholder='Search Users'></input>
                        </form>
                    </div>
                </div>

                <div className='flex justify-center items-center gap-[20px] relative'>
                    {profileOpen && 
                    <div className='w-[300px] min-h-[300px] shadow-lg absolute top-[69px] bg-white rounded-lg '>
                        <div className = "flex flex-col justify-center items-center pt-3 gap-[12px]">
                            <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
                                <img src={default_dp} alt=""/>
                            </div>
                            <div className='font-semibold text-[19px]'>{userData?.userName}</div>
                            <button className="w-[280px] h-[40px] rounded-full border-2 border-blue-300 text-blue-400 shadow-md">View Profile</button>
                            <div className='w-[280px] h-[1px] bg-gray-400 shadow-lg'></div>
                            <div className='flex w-full justify-center items-center gap-4'>
                                <IoMdPeople className='w-[25px] h-[25px] text-gray-600'/>
                                <div className='text-gray-600'>My Network</div>
                            </div>
                            <button className='w-[280px] h-[40px] border-2 border-red-400 text-red-400 rounded-full shadow-lg'onClick={userSignOut} >Sign Out</button>
                        </div>
                    </div>}

                    <div className = "hidden lg:flex flex-col justify-center items-center">
                        <IoMdHome className='w-[25px] h-[25px] text-gray-600'/>
                        <div className='text-gray-600'>Home</div>
                    </div>
                    <div className = "hidden md:flex flex-col justify-center items-center">
                        <IoMdPeople className='w-[25px] h-[25px] text-gray-600'/>
                        <div className='text-gray-600'>My Network</div>
                    </div>
                    <div className = "flex flex-col justify-center items-center">
                        <IoMdNotifications className='w-[25px] h-[25px] text-gray-600'/>
                        <div className='hidden md:block md:text-gray-600'>Notification</div>
                    </div>
                    <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                        <img src={default_dp} alt="" onClick={()=>{setProfileOpen(profileOpen => !profileOpen)}} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar


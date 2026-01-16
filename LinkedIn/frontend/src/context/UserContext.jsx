import React from "react";
import { useContext , useEffect} from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios"
import { useState } from "react";

export const userDataContext = createContext()
function UserContext({children}){
    let {serverUrl} = useContext(authDataContext)
    let [userData,setUserData] = useState(null)
    const getCurrentUser = async ()=>{
        try{
            let res = await axios.get(serverUrl+"/api/user/currentUser",{withCredentials:true})
            setUserData(res.data)
        }
        catch(error){
            console.log(error)
            setUserData(null)
        }
    }
    useEffect(()=>{
        getCurrentUser()
    },[])
    const value={
        userData,
        setUserData
    }
    return(
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext

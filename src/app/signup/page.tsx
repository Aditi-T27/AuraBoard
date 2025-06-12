"use client"
import React from "react"
import toast from "react-hot-toast"
import {Toaster} from "react-hot-toast"
import axios from "axios"
import { Playwrite_CA } from "next/font/google"
import { collectSegmentData } from "next/dist/server/app-render/collect-segment-data"

export default function SignUp(){
  const[user,setUser]=React.useState({
    name:"",
    email:"",
  })
  
const onSignUp= async()=>{
    const response = await axios.post("/api/users/signup",user);
    console.log(response);
    if(response.data.ok){
        toast.success("Successfully Created the user, Welcome to the portal!");
    }
    else{
        toast.error(`Could not create User data.${response.data.message}`);
    }
}

    return(
        <>
           <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="text-2xl underline">SignUp</div><br />
            <div className="flex w-full max-w-md">
                <label className="w-40 text-2xl" htmlFor="username" >Username</label>
                <input className="rounded-sm p-2 bg-white  text-gray-400 " type="text" value={user.name} onChange={(e)=>{
                    setUser({...user,name:(e.target.value)})
                }} placeholder="enter username"/>
            </div>
            <br />
            <div  className="flex w-full max-w-md">
                <label htmlFor="email" className="w-40 text-2xl">email</label>
                <input className="rounded-sm p-2 bg-white text-gray-400" type="text" value={user.email} onChange={(e)=>{
                    setUser({...user,email:(e.target.value)})
                }}/>
            </div>
            <br />
            <button className="p-2 bg-amber-700 text-1xl hover:underline hover:cursor-pointer" onClick={onSignUp}>Sign Up</button>
           </div>
             <Toaster position="top-center"/>
        </>
    )
}
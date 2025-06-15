"use client"
import React from "react"
import toast from "react-hot-toast"
import {Toaster} from "react-hot-toast"
import axios from "axios"
import Link from "next/link"
import {useRouter} from "next/navigation"

export default function Login(){
    const router=useRouter();
  const[user,setUser]=React.useState({
    email:"",
    password:""
  })
   
  const onLogin= async()=>{
    const response = await axios.post("/api/users/login",user,{
        withCredentials: true
    });
    console.log(response);
    if(response.data.ok){
        toast.success("Welcome back! Login successful!");
        router.push("/");
    }
    else{
        toast.error(`Login failed. ${response.data.message}`);
    }
  }
     
  return(
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#6B46C1',
            color: '#fff',
            border: '1px solid #8B5CF6',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Auro Word</h1>
          <p className="text-purple-200 text-sm">Welcome back to your journaling space</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
            <p className="text-purple-200 text-sm">Continue your journaling journey</p>
          </div>

          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-100 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    setUser({...user,email:(e.target.value)})
                  }}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-300/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-100 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({...user,password:(e.target.value)})
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-300/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-sm text-purple-300 hover:text-white transition-colors duration-200 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              onClick={onLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-300/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-purple-300">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-purple-200 text-sm">
                Don't have an account?{" "}
                <Link 
                  href="/signup" 
                  className="text-purple-300 hover:text-white font-medium hover:underline transition-colors duration-200"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-purple-300">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs">Secure Login</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">Privacy Protected</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-purple-300 text-xs">
            Your thoughts and memories, safely preserved
          </p>
        </div>
      </div>
    </div>
  )
}


// "use client"
// import React from "react"
// import toast from "react-hot-toast"
// import {Toaster} from "react-hot-toast"
// import Link from "next/link"

// export default function SignUp(){
//   const[user,setUser]=React.useState({
//     email:"",
//     password:""
//   })
  
// const onLogin= async()=>{
//     const response = await axios.post("/api/users/login",user);
//     console.log(response);
//     if(response.data.ok){
//         toast.success("Successfully Created the user, Welcome to the portal!");
//     }
//     else{
//         toast.error(`Could not create User data.${response.data.message}`);
//     }
// }

//     return(
//         <>
//            <div className="flex flex-col justify-center items-center min-h-screen">
//             <div className="text-2xl underline">Login</div><br />
           
//             <br />
//             <div  className="flex w-full max-w-md">
//                 <label htmlFor="email" className="w-40 text-2xl">email</label>
//                 <input className="rounded-sm p-2 bg-white text-gray-400" type="text" value={user.email} onChange={(e)=>{
//                     setUser({...user,email:(e.target.value)})
//                 }}/>
//             </div>
//             <br />
//                <br />
//             <div  className="flex w-full max-w-md">
//                 <label htmlFor="password" className="w-40 text-2xl">Password</label>
//                 <input className="rounded-sm p-2 bg-white text-gray-400" type="text" value={user.password} onChange={(e)=>{
//                     setUser({...user,password:(e.target.value)})
//                 }}/>
//             </div>
//             <button className="p-2 bg-amber-700 text-1xl hover:underline hover:cursor-pointer" onClick={ onLogin}>Login</button>
//             <br />
//             <span>Do not have a account?<Link href={"/signup"} className="underline">Sign Up</Link></span>
//            </div>
//              <Toaster position="top-center"/>
//         </>
//     )
// }
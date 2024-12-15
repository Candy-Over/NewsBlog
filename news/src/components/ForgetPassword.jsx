import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import { RxCross1 } from "react-icons/rx";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader"
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const ForgetPassword=()=>{
    const navigate=useNavigate()
    const [response, setResponse]=useState(false)
    const [hide, setHide]=useState(1)
    const [confHide, setConfHide]=useState(1)
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confPasword,setConfPassword]=useState('')
    const [otp, setOtp]=useState()
    const [resOtp, setResponceOtp]=useState()
    const [success, setSuccess]=useState(0)
    const [cancel, setCancel]=useState(0)
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    // handle Reset password
    const handleResetPassword=async()=>{
        try{
            const res=await axios.post(import.meta.env.VITE_BACKEND_DATABASE+'/reset',{
                email,
                password
            }, {withCredentials: true})
            setResponse(true)
            if(res.status==200){
                setResponse(false)
                setSuccess(1)
            }
            else if(res.status==201){
                setResponse(false)
                toast.error("The new password must be different from the old password")
            }
            else if(res.status==202){
                setResponse(false)
                toast.error("Account does not exist")
            }
        }
        catch(err){
            toast.error("Something went wrong")
            console.log("Eror while resetting password: "+err)
        }
    }
    
    // Password validation
    function validatePassword() {
        if(password!=confPasword){
            toast.error("Confirm password doesn't match");
            return true
        }
        if (password.length < 8) {
            toast.error("Your password must be at least 8 characters long.");
            return true
        }
        if (!/[A-Z]/.test(password) && !/[a-z]/.test(password)) {
            toast.error("Your password must include at least one letter (A-Z) or (a-z).");
            return true
        }
        if (!/\d/.test(password)) {
            toast.error("Your password must include at least one number (0-9).");
            return true
        }
        if (!/[@$!%*?&#]/.test(password)) {
            toast.error("Your password must include at least one special character (e.g., !@#$%^&*).");
            return true
        }
    }

    // Handle OTP send
    const handleOtpSend=async(e)=>{
        e.preventDefault()
        if(!emailRegex.test(email)){
            toast.error("Email format is wrong")
            return
        }
        if(validatePassword()) return

        setCancel(1)
        try{
            const res=await axios.post(import.meta.env.VITE_BACKEND_DATABASE+"/otp",{
                email,
                password
            },{ withCredentials: true })
            console.log(res.data)
            toast.success(`OTP sent to ${email}`)
            if(res.status==200)
            {
                setResponceOtp(res.data)
            }
            if(res.status==201){
                toast.error("Invalid email address")
            }
        }
        catch(err){
            console.log("Error from client while checking otp: "+err)
        }
    }

    // Handle check OTP
    const handleCheckOTP=()=>{
        if(resOtp==otp){
            handleResetPassword()
            setCancel(0)
        }
        else{
            toast.error("Wrong OTP")
        }
    }

    if(response){
        return(
            <Loader/>
        )
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='bg-[#111725] h-screen flex flex-col gap-3 justify-center items-center relative'>
            
                {/* OTP verifying */}
                {
                    cancel?
                    <div className='bg-[#01030cd0] min-h-screen w-full absolute flex items-center justify-center backdrop-blur-sm'>
                        <div className='relative'>
                            
                            <RxCross1 className='text-white font-bold text-[1.3vmax] absolute top-0 right-0 m-[1vmax] hover:cursor-pointer' onClick={()=>setCancel(0)}/>

                            <div className='bg-[#14254b] py-[1.3vmax] px-[3vmax] w-[30vmax] rounded-md flex flex-col gap-2 md:gap-4 items-center'>
                                <p className='text-zinc-50 font-semibold text-[1.4vmax] pb-[1vh]'>Enter OTP</p>
                                <input className='p-[.3vmax] w-full bg-transparent border-2 border-[#8c97b6] roounded-sm md:rounded-md outline-none text-zinc-50 text-[1.3vmax]' type="text" placeholder='Enter otp' onChange={(e)=>setOtp(e.target.value)}/>
                                <button className='text-zinc-50 px-[2vmax] py-[.4vmax] font-medium text-[1.3vmax] bg-[#2b92f1] rounded-sm md:rounded-md hover:bg-[#258ed4] hover:text-[#ffffff]' onClick={handleCheckOTP}>Verify</button>
                                <p className='text-[1.1vmax] text-customLiteBlue font-medium hover:cursor-pointer' onClick={handleOtpSend}>Resend OTP</p>
                            </div>
                        </div>
                    </div>:<></>
                }

                {/* Password Changes Successfully */}
                {
                    success?
                    <div className='bg-[#01030cd0] min-h-screen w-full absolute flex items-center justify-center backdrop-blur-md'>
                        {/* <div className='relative'> */}
                            <div className='bg-[#14254b] py-[3vmax] px-[3vmax] w-[30vmax] rounded-md flex flex-col gap-2 md:gap-3 justify-center items-center'>
                                <IoCheckmarkDoneCircleSharp className='text-[#32ffbb] text-[5vmax]'/>
                                <p className='text-zinc-50 font-semibold text-[1.4vmax]'>Password Updated!</p>
                                <p className='text-[#b3d2f5] font-semibold text-[1vmax] pb-[1.6vh]'>Your password has been changed successfully</p>
                                <button className='text-zinc-50 px-[2vmax] py-[.4vmax] font-medium text-[1.2vmax] bg-[#2b92f1] rounded-sm md:rounded-sm hover:bg-[#2079b4] hover:text-[#ffffff]' onClick={()=>navigate("/login")}>Back to Login</button>
                            </div>
                        {/* </div> */}
                    </div>:<></>
                }

                <p className='text-[2.3vmax] font-medium text-[white]'>Reset password</p>:
                <div className='overflow-hidden w-[50vw] h-auto bg-[#02030e57] rounded-md flex flex-row gap-5 justify-center items-center'>
                    <form method='post' className="w-full flex flex-col gap-2 md:gap-5 p-[3vmax]">
                            <input className='p-[.3vmax] w-full bg-transparent border-2 border-zinc-800 rounded-md outline-none text-zinc-50 text-[1.3vmax]' type="text" placeholder='Enter your email' name="email" onChange={(e)=>setEmail(e.target.value)}/>
                            
                            <div className='flex flex-row items-center gap-1'>
                                <input className='p-[.3vmax] w-full bg-transparent border-2 border-zinc-800 rounded-md outline-none text-zinc-50 text-[1.3vmax]' type={hide?"password":"text"} placeholder='Password' name="password" onChange={(e)=>setPassword(e.target.value)}/>
                                <p className="text-[1.3vmax] text-zinc-50" onClick={()=>setHide(!hide)}>{hide?<BiSolidHide/>:<BiSolidShow/>}</p>
                            </div>

                            <div className='flex flex-row items-center gap-1'>
                                <input className='p-[.3vmax] w-full bg-transparent border-2 border-zinc-800 rounded-md outline-none text-zinc-50 text-[1.3vmax]' type={confHide?"password":"text"} placeholder='Confirm password' name="confirm password" onChange={(e)=>setConfPassword(e.target.value)}/>
                                <p className="text-[1.3vmax] text-zinc-50" onClick={()=>setConfHide(!confHide)}>{confHide?<BiSolidHide/>:<BiSolidShow/>}</p>
                            </div>
                        
                        <p className='text-center transition duration-375 w-full text-[#ffffff] text-[1.3vmax] font-medium px-[1.1vmax] py-[.5vmax] bg-[#233c91] rounded-md hover:bg-[#1c3074] hover:text-[#ffffff]' onClick={handleOtpSend}>Reset Password</p>
        
                    </form>


                </div>
                <p className='text-right text-zinc-50 text-[1.2vmax]' >Back to <span className='text-customLiteBlue font-medium hover:cursor-pointer hover:text-customDarkBlue' onClick={()=>navigate("/login")}>login</span></p>
            </div>
        </>
    )
}

export default ForgetPassword

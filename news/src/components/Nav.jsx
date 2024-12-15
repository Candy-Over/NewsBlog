import React, { useState } from "react";
import axios from "axios"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { LuUserCircle2 } from "react-icons/lu";
import { FiAlignJustify } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import Search from "./Search";

const Nav=()=>{
    
    const location=useLocation()

    const [searchToggle, setSearchToggle]=useState(false)
    // const [profileToggle, setProfileToggle]=useState(false)
    return(
        <>
            <div className="flex flex-row py-[.8vmax] px-[3vmax] bg-darkBack justify-between items-center">
                <NavLink to="/">
                    <h1 className="text-white font-bold text-[2vmax]">News<span className="text-customLiteBlue">Blog</span></h1>
                </NavLink>


                <div className="flex flex-row gap-[5vmax]">
                    <NavLink to="/" className={({isActive})=>`text-[1.4vmax] font-bold cursor-pointer ${isActive?"text-customLiteBlue":"text-[#bfcdde]"}`}>News</NavLink>
                    
                    <NavLink to="/blog" className={({isActive})=>`text-[1.4vmax] font-bold cursor-pointer ${isActive?"text-customLiteBlue":"text-[#bfcdde]"}`}>Blog</NavLink>
                </div>
                
                <div className="flex flex-row gap-4">
                    
                    <div className="p-[.9vmax] rounded-[50%] bg-[#6d6d6d86] flex justify-center items-center hover: cursor-pointer  hover:bg-[#ffffff69] hover: transition duration-300" onClick={()=>setSearchToggle(!searchToggle)}>
                        {
                            searchToggle?<RxCross1 className="text-white size-[1.4vmax]"/>:<IoSearch className="text-white size-[1.4vmax]"/>
                        }
                        
                    </div>
                    {
                        location.pathname=='/profile'?
                        <Logout />
                        :<NavLink to="/login">
                            <div className="p-[.7vmax] gap-2 rounded-[1vmax] bg-[#6d6d6d86] flex flex-row hover: cursor-pointer  hover:bg-[#ffffff69] hover: transition duration-300">
                                <LuUserCircle2 className="text-white size-[2vmax]"/> 
                            </div>
                        </NavLink>
                    }
                    
                </div>

            </div>
            {
                searchToggle?<Search />:<></>
            }
            <Outlet/>
        </>
    )
}

export const Logout=()=>{

    const navigate=useNavigate()
    const handleLogout=async()=>{
        await axios.get(import.meta.env.VITE_BACKEND_DATABASE+'/logout',
        { withCredentials: true })
        .then((res)=>{
            console.log(res.data)
            navigate("/login")
        })
        .catch((err)=>{
            console.log("Some thing went wrong while logging out")
        })
    }
    return(
        <>
            <button className='text-zinc-50 bg-logoutLite rounded-sm px-[1vmax] font-medium text-[1.1vmax] hover:bg-logoutDark hover:text-[#fcbbdb]' onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Nav
import React, { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../contextApi";
import { motion } from "framer-motion";


const Search=()=>{
    const [text, setText]=useState('')
    const { search,setSearch }=useContext(MyContext)
    const navigate=useNavigate()
    const handleSearch=()=>{
        setText(text.toLowerCase())
        if(text=='' || text==search){
            alert("Searchbar is empty")
        }
        else{
            navigate(`/search/${text}`)
        }
    }

    return(
        <>
            <div className="bg-liteBack px-[3vmax] py-[1vmax] flex  justify-center">
                <motion.div className="flex flex-row bg-[#eeeeee] p-[.3vmax] rounded w-[50vw]"
                    initial={{ opacity: 0, y:-5}}
                    animate={{ opacity: 1, y:0}}
                    transition={{ duration: .6}}
                >
                    <input type="text" placeholder="Search" className="bg-[#f59f0b00]  w-[100vw] text-[1vmax] outline-none" onChange={(e)=>setText(e.target.value)}/>
                    <p className="text-white text-[1.3vmax] py-[.5vmax] px-[.7vmax] rounded font-bold bg-customLiteBlue hover: cursor-pointer hover:bg-customDarkBlue transition duration-200" onClick={handleSearch}>Search</p>
                </motion.div>
            </div>
        </>
    )
}

export default Search
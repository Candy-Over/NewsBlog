import React, { useEffect, useState } from 'react'
import axios from "axios"
import Loader from './Loader'
import BlogCard from './BlogCard';
import { BiSolidErrorAlt } from "react-icons/bi";
import { TbMoodEmpty } from "react-icons/tb";

function Blog() {

  const [data, setData]=useState(null)

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        // console.log("Blog.jsx element")
        const data=await axios.get(import.meta.env.VITE_BACKEND_POST_DATABASE+"/allpost")
        console.log(data)
        setData(data.data)
      }
      catch(err){
        console.log("Error fetching blogs: "+err)
        return(
          <>
              <div className='flex flex-col bg-liteBack h-[100vh] gap-6 justify-center items-center p-[3max] '>
                  <BiSolidErrorAlt className='text-zinc-50 text-[20vmin]'/>
                  <p className='text-zinc-50 text-[1.6vmax] font-semibold'>Error occured</p>
                  <button className='p-[1vmax] rounded-md text-[1.1vmax] font-medium text-[white] bg-[#0EA5E9] hover:text-[1.3vmax] ease-in duration-300' onClick={()=>navigate("/")}>Back to home</button>
              </div>
          </>
        )
      }
    }
    fetchData()
  },[])

  if(!data){
    return(
      <Loader />
    )
  }

  if(!data.length){
    return(
      <>
        <div className='flex flex-col bg-liteBack h-screen gap-6 justify-center items-center'>
          <TbMoodEmpty className='text-zinc-50 text-[20vmin]'/>
          <p className='text-zinc-50 text-[1.6vmax] font-semibold'>Oops! Looks like no one has posted yet</p>
          {/* <button className='p-[1vmax] rounded-md text-[1.1vmax] font-medium text-[white] bg-[#0EA5E9] hover:text-[1.3vmax] ease-in duration-300' onClick={()=>navigate("/")}>Back to home</button> */}
        </div>
      </>
    )
  }

  return (
    <>
    <div className="bg-[#111725] min-h-screen flex flex-col gap-4 justify-start px-[3vmax] py-[2vmax]">
      <p className="text-zinc-50 font-medium text-[2vmax] mx-auto pb-[1vmax]">Latest Posts</p>
      {
        data.reverse().map((i) => <BlogCard key={i._id} Data={i} />)
      }
    </div>
  </>
  
  ) 
}

export default Blog

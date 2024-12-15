import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LuUserCircle2 } from "react-icons/lu";
import { BiSolidErrorAlt } from "react-icons/bi";
import axios from "axios"
import Loader from './Loader'
import UserPost from './UserPost';

function Profile() {
    const navigate=useNavigate()
    const [name, setName]=useState(null)
    const [email, setEmail]=useState(null)
    const [post, setPost]=useState('')
    const [img, setImg]=useState(null)
    const [title, setTitle]=useState('')
    const [content, setContent]=useState(null)
    const [error, setError]=useState(0)
    const [change, setChange]=useState(1)

    useEffect(()=>{
        
        // console.log("Profile useEffect")

        const fetchData=async ()=>{
            try{
                const data=await axios.get(import.meta.env.VITE_BACKEND_DATABASE+'/profile',{withCredentials: true})
                // console.log(userPost)

                if(data.status==201){
                    navigate("/login")
                }
                const { email, name, post, img }=data.data

                setName(name)
                setEmail(email)
                setPost(post)
                setImg(img)
            }
            catch(err){
                console.log("Error occured while fetching from profile: "+err)
                setError(1)
            }
        }
        fetchData()
    },[change])

    const handleClearPost=()=>{
        setTitle('')
        setContent('')
    }
    
    const handlePost=async()=>{
        if(content!='' && title!=''){
            await axios.post(import.meta.env.VITE_BACKEND_POST_DATABASE+'/create',{
                email,
                title,
                content
            },{withCredentials: true})
            .then(res=>{
                toast.success('Post created successfully!')
                setChange(!change)
            })
            .catch(err=>{
                console.log(err)
                toast.error("This didn't work.")
            })
        }
        else{
            toast.error("Title or Content field is empty")        
        }
    }

    if(error){
        return(
            <>
                <div className='flex flex-col bg-liteBack h-[100vh] gap-6 justify-center items-center p-[3max] '>
                    <BiSolidErrorAlt className='text-zinc-50 text-[20vmin]'/>
                    <p className='text-zinc-50 text-[1.6vmax] font-semibold'>Something went wrong</p>
                </div>
            </> 
        )    
    }
    if(!email){
        return <Loader/>
    }
    return (    
        <>
            <Toaster
            position="top-center"
            reverseOrder={false}
            />

            <div className='bg-[#111725] min-h-screen p-[3vmax] flex flex-col gap-4'>
                <div className='flex flex-row gap-5 items-center pb-[1vmax] md:pb-[3vmax]'>
                    {/* <LuUserCircle2 className='p-[1.3max] text-[#eaf3ff] bg-slate-400 rounded-full text-[8vmax]'/> */}
                    {/* <img src="https://www.shutterstock.com/image-vector/cute-panda-cartoon-isolated-on-600nw-2371081785.jpg" className='p-[1.3max] rounded-full h-[8vmax]'/> */}
                    <img src={img} className='w-10 h-10 sm:w-16 sm:h-16 md:w-32 md:h-32 rounded-full object-cover' alt='Profile' />
                    <div>
                        <p className='text-zinc-50 font-medium text-[2.5vmax]'>{name}</p>
                        <p className='text-zinc-50 font-medium text-[1.5vmax]'>{email}</p>
                    </div>
                </div>
                <p className='text-zinc-50 font-medium text-[2vmax]'>Create a new post</p>
                
                <div className='flex flex-col justify-center items-start gap-2'>
                    <input className='bg-[#020411] p-[1vmax] rounded-md w-full text-zinc-50 text-[1.3vmax] outline-none' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                
                    <textarea className='bg-[#020411] h-[30vh] text-[1.3vmax] text-zinc-50 rounded-md p-[1vmax] outline-none border-red-100 w-full' placeholder='Write your blog' value={content} onChange={(e)=>setContent(e.target.value)}/>
                    <div className='flex flex-row gap-3'>
                        <button className='text-zinc-50 rounded-md px-[1.6vmax] py-[.6vmax] text-[1.5vmax] m-auto mb-6 bg-[#ce284c] hover:bg-[#a72843] hover:text-[#fcbbdb]' onClick={handleClearPost}>Clear</button>

                        <button className='text-zinc-50 rounded-md px-[1.6vmax] py-[.6vmax] text-[1.5vmax] m-auto mb-6 bg-[#3e68f3] hover:bg-[#1c3074] hover:text-[#9daedb]' onClick={handlePost}>Create Post</button>
                    </div>
                </div>

                <hr/>
                <p className='text-zinc-50 font-medium text-[2vmax] mx-auto pb-[1vmax]'>Your Posts</p>
                {
                    !post.length?<p className='text-zinc-50 text-[1.2vmax] mx-auto'>No post yet</p>:
                    <UserPost email={email} change={change}/>
                }
            </div>
        
        </>
  )
}

export default Profile

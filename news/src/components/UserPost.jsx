import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ImBin } from "react-icons/im";
import toast, { Toaster } from 'react-hot-toast';

function UserPost({email, change}) {
    // console.log("User Post")
    const [data, setData]=useState(null)
    const [reload, setRealod]=useState(1)
    
    useEffect(()=>{
        // console.log("Hello")
        const fetchData=async ()=>{
            try{
                const data=await axios.post(import.meta.env.VITE_BACKEND_POST_DATABASE+'/userpost',{
                    email,
                },{withCredentials: true})
                setData(data.data.post)
            }
            catch(err){
                console.log("Error occured while fetching user posts: "+err)
            }
        }
        fetchData()
    },[reload, change])

    if(!data){
        return(
            <>
                <div className="h-auto bg-[#111725] m-auto">
                    <span className="loader"></span>
                </div>
            </>
        )
    }
    // console.log(data)
    return (
        <>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        {
            data.reverse().map((i)=><PostCard key={i._id} Data={{info: i, email: email, realod: reload, setRealod: setRealod}}/>)
        }
        </>
    )
}


export const PostCard=React.memo((Data)=>{
    // console.log(Data.Data.email)
    const [show, setShow]=useState(0)
    const { _id, title, content, createdAt }=Data.Data.info
    const { email }=Data.Data
    const date=new Date(createdAt)
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const monthShortNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const handleDletePost=async()=>{
        // console.log(_id, email)
        try{
            await axios.post(import.meta.env.VITE_BACKEND_POST_DATABASE+'/delete',{
                _id,
                email
            },{withCredentials: true})
            toast.success('Post deleted successfully!')
            Data.Data.setRealod(!Data.Data.realod)
        }
        catch(err){
            console.log("Error occured while deleting the post: "+err)
            toast.error("Faced probelm while deleting post")
        }
    }

    return(
        <>
            <div className='flex flex-row items-center gap-1'>
                <div className='bg-[#020411] w-[100vw] rounded-md flex flex-col overflow-hidden'>
                    <p className='pl-[1.3vmax] py-[.5vmax] h-auto w-auto text-[.9vmax] p-[.4vmax] text-zinc-50'>
                        {`${monthShortNames[month]}-${day}-${year}`} 
                    </p>
                    <p className='px-[1.3vmax] py-[.3vmax] h-auto w-auto bg-[#05081bd5] rounded-md text-[1.6vmax] text-[#81c6ff]'>{title}</p>
                    <p className={`p-[1.3vmax] ${!show?'h-[10vmin]':'h-auto'} w-auto bg-[#05081bd5] rounded-md text-[1.2vmax] text-[#d4d4d4e3] overflow-hidden`}>{content}</p>
                    
                    <button className='h-full text-zinc-50 py-1 font-medium bg-[#263f8f] hover:bg-[#1c3074] text-[1.2vmax] hover:text-[#ffffff]' onClick={()=>setShow(!show)}>
                       {!show?"Read More":"Read Less"}
                    </button>
                </div>
                <div className='bg-logoutLite h-full rounded-md hover:bg-logoutDark'>
                    <ImBin className='text-zinc-50 p-[1vmax] text-[8vmin] hover:cursor-pointer' onClick={handleDletePost}/>
                </div>
            </div>            
        </>
    )
})

export default React.memo(UserPost)

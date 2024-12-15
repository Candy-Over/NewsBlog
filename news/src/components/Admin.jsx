import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "./Loader"
import { FaUser } from "react-icons/fa";
import { FaBloggerB } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaUserAltSlash } from "react-icons/fa";
import { PiWarningCircleLight } from "react-icons/pi";

const Admin = ({setGotoAdmin}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [button, setButton] = useState(1)
    const [reloadUser, setReloadUser]=useState(1)
    const [reloadPost, setReloadPost]=useState(1)
    const [user, setUser] = useState(null)
    const [post, setPost] = useState(null)
    const [del, setDel] = useState(null)

    const getALLData=async()=>{
        try{
            const [ user, post, del ]=await Promise.all([
                axios.get(import.meta.env.VITE_BACKEND_POST_DATABASE+'/alluser'),
                axios.get(import.meta.env.VITE_BACKEND_POST_DATABASE+'/allpost'),
                axios.get(import.meta.env.VITE_BACKEND_ADMIN+'/delete-detail')
            ]
            )
            setUser(user.data)
            setPost(post.data)
            setDel(del.data)
            // console.log(user.data)
            // console.log(del.data)
        }
        catch(err){
            console.log("Error Admin client when all data is fetched: "+err)
        }
        
    }

    useEffect(()=>{
        console.log("Hello")
        getALLData()
    },[button, reloadUser, reloadPost])

    // console.log(post.length)

    //Add admin handle function
    const handleAddAdmin=async (e)=>{
        e.preventDefault()
        console.log(email, password)
    }

    if(!user && !post){
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
            <div className='bg-[#080e25] min-h-screen flex flex-col gap-3 justify-start items-center pb-14 relative'>
                
                {/* Simple nav */}
                <div className='flex flex-row justify-between items-center py-[1vmax] px-[3vmax] bg-[#101746] w-full'>
                    <p className='text-zinc-50 text-[1.7vmax] font-semibold'>Admin <span className='text-customLiteBlue'>Dashboard</span></p>

                    <button className='text-zinc-50 bg-logoutLite rounded-sm p-[.8vmax] font-medium text-[1.1vmax] hover:bg-logoutDark hover:text-[#fcbbdb]' onClick={()=>setGotoAdmin(false)}>Logout</button>
                </div>

                {/* user, post, deleted user, seleted post cards */}
                <div className='flex flex-wrap md:flex-row gap-5 justify-center items-center p-[1.3vmax]'>

                    <div className='bg-[#263663] w-[30vw] md:w-[15vw] rounded-md flex flex-row justify-start items-center gap-3 p-[.6vmax] overflow-hidden'>

                        <div className='h-8 w-8 md:h-14 md:w-14 bg-[#15488a] flex items-center justify-center rounded-full'>
                            <FaUser className='text-[#34f089] text-1 md:text-[2vw]' />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-zinc-50 font-semibold text-[.9vmax] md:text-[1.4vmax]'>User</p>
                            <p className='text-[#badaff] font-semibold text-[.9vmax] md:text-[1.2vmax]'>{user.length}</p>
                        </div>
                    </div>

                    <div className='bg-[#263663] w-[30vw] md:w-[15vw] rounded-md flex flex-row justify-start items-center gap-3 p-[.6vmax] overflow-hidden'>
                        <div className='h-8 w-8 md:h-14 md:w-14 bg-[#15488a] flex items-center justify-center rounded-full'>
                            <FaBloggerB className='text-[#f0ae34] text-1 md:text-[2vw]' />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-zinc-50 font-semibold text-[.9vmax] md:text-[1.4vmax]'>Post</p>
                            <p className='text-[#badaff] font-semibold text-[.9vmax] md:text-[1.2vmax]'>{post.length}</p>
                        </div>
                    </div>

                    <div className='bg-[#263663] w-[30vw] md:w-[15vw] rounded-md flex flex-row justify-start items-center gap-3 p-[.6vmax] overflow-hidden'>
                        <div className='h-8 w-8 md:h-14 md:w-14 bg-[#15488a] flex items-center justify-center rounded-full object-cover'>
                            <FaUserAltSlash className='text-[#f03434] text-1 md:text-[2vw]' />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-zinc-50 font-semibold text-[.9vmax] md:text-[1.4vmax]'>Deleted User</p>
                            <p className='text-[#badaff] font-semibold text-[.9vmax] md:text-[1.2vmax]'>{del.deletedUser}</p>
                        </div>
                    </div>

                    <div className='bg-[#263663] w-[30vw] md:w-[15vw] rounded-md flex flex-row justify-start items-center gap-3 p-[.6vmax] overflow-hidden'>
                        <div className='h-8 w-8 md:h-14 md:w-14 bg-[#15488a] flex items-center justify-center rounded-full object-cover'>
                            <MdDelete className='text-[#f03434] text-1 md:text-[2vw]' />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-zinc-50 font-semibold text-[.9vmax] md:text-[1.4vmax]'>Deleted Post</p>
                            <p className='text-[#badaff] font-semibold text-[.9vmax] md:text-[1.2vmax]'>{del.deletedPost
}</p>
                        </div>
                    </div>

                </div>

                {/* <br /> */}
                <div className='h-[.2vmax] w-[90vw] bg-[#15193f] my-[3vmax]' />

                {/* user and posts button */}
                <div className='flex flex-row gap-2 w-[75vw] items-center justify-center'>

                    <button className={`p-[.6vmax] text-[.99vmax] md:text-[1.3vmax] ${button ? 'bg-[#3f5aa5]' : 'bg-[#263663]'} w-[50%] rounded-sm md:rounded-md ${button ? 'text-zinc-50' : 'text-[#bddcff]'} font-semibold`} onClick={() => setButton(!button)}>User</button>

                    <button className={`p-[.6vmax] text-[.99vmax] md:text-[1.3vmax] ${!button ? 'bg-[#3f5aa5]' : 'bg-[#263663]'} w-[50%] rounded-sm rounded-md ${!button ? 'text-zinc-50' : 'text-[#bddcff]'} font-semibold`} onClick={() => setButton(!button)}>Posts</button>

                </div>

                {/* Users */}
                {
                    button?user.length?
                    <div className='p-[1vmax] h-auto flex flex-col gap-3 bg-[#16214b] w-[75vw] rounded-md'>
                        {
                            user.map((i)=><UserCard key={i._id} Data={i} reloadUser={reloadUser} setReloadUser= { setReloadUser }/>)
                        }
                    </div>:
                    <div className='p-[1vmax] h-auto flex flex-col gap-3 bg-[#16214b] w-[75vw] rounded-md'>
                        <p className='text-zinc-50 m-auto text-[1.3vmax]'>No user</p>
                    </div>
                    :<></>
                }

                {/* Post */}
                {
                    !button?post.length?
                    <div className='p-[1vmax] h-auto flex flex-col gap-3 bg-[#16214b] w-[75vw] rounded-md'>
                        {
                            post.map((i)=><PostCard key={i._id} Data={i} reloadPost={reloadPost} setReloadPost= { setReloadPost }/>)
                        }
                    </div>:
                    <div className='p-[1vmax] h-auto flex flex-col gap-3 bg-[#16214b] w-[75vw] rounded-md'>
                        <p className='text-zinc-50 m-auto text-[1.3vmax]'>No posts</p>
                    </div>
                    :<></>
                    
                    
                }

                {/* Add admin */}
                {/* <div className='flex flex-col w-[70vw] py-[.6vmax]'>
                    <p className='text-[#b6d2ff] font-medium m-auto text-[1.3vmax] py-[1.3vmax]'>Add Admin</p>
                    <div className='flex flex-row md:flex-row gap-2 p-[1.3vmax] rounded-md bg-[#1d2644]'>
                        <input className='p-[.3vmax] w-full bg-[#101838] border-2 border-[#1d3f9b] rounded-md outline-none text-zinc-50 text-[1.3vmax]' type="text" placeholder='Email' name="email" onChange={(e)=>setEmail(e.target.value)}/>

                        <input className='p-[.3vmax] w-full bg-[#101838] border-2 border-[#1d3f9b] rounded-md outline-none text-zinc-50 text-[1.3vmax]' type="text" placeholder='Password' name="email" onChange={(e)=>setPassword(e.target.value)}/>
                        <button className='text-zinc-50 p-[.5vmax] font-medium rounded-md text-[1.3vmax] bg-[#248f54] hover:bg-[#1e7746]' onClick={handleAddAdmin}>Add</button>
                    </div>                    
                </div>

                <div className='flex flex-col gap-3 w-[70vw] h-auto rounded-md bg-[#879bcc4f] py-[1.6vmax] px-[1vmax] overflow-hidden'>
                    <AdminCard/>
                    <AdminCard/>
                </div> */}


                {/* Confirm Delete */}
                
                {/* <div className='min-h-screen w-full bg-[#00000060] absolute flex justify-center items-center backdrop-blur-sm'>
                    <div className='bg-[#f3f5ff] w-[50%] sm:w-[30%] px-[3vmax] py-[1vmax] rounded-md flex flex-col gap-3 items-center justify-center'>
                        <PiWarningCircleLight className='text-[10vmin]'/>
                        <p className='text-[1.3vmax]'>Are you sure?</p>

                        <div className='flex flex-row gap-2 w-full'>
                            <button className='text-zinc-50 w-[50%] bg-customLiteBlue rounded-sm p-[.6vmax] font-medium text-[1.1vmax] hover:bg-customDarkBlue hover:text-[#ffffff]'>Yes</button>

                            <button className='text-zinc-50 w-[50%] bg-logoutLite rounded-sm p-[.6vmax] font-medium text-[1.1vmax] hover:bg-logoutDark hover:text-[#ffffff]'>No</button>
                        </div>

                    </div>
                </div> */}


            </div>
        </>
    )
}

//Admin card
export const AdminCard = () => {
    return (
        <>
            <div className='flex flex-row items-center justify-between pl-[1vmax] rounded-md bg-[#09112e] overflow-hidden'>
                <p className='text-[#d5e9ff] text-[1.2vmax]'>abhijit@gmail.com</p>
                <p className='text-[#d5e9ff] text-[1.2vmax]'>sdasgdahdh</p>
                <button className='text-zinc-50 p-[.4vmax] font-medium  text-[1.3vmax] bg-logoutLite hover:bg-logoutDark'>Delete</button>
            </div>
        </>
    )
}

//User Card
export const UserCard = ({Data, reloadUser, setReloadUser}) => {

    const handleDleteUser=async()=>{
        // console.log(Data._id, Data.email)
        try{
            await axios.post(import.meta.env.VITE_BACKEND_ADMIN+'/delete/user',{
                _id: Data._id,
                email: Data.email
            },{withCredentials: true})
            setReloadUser(!reloadUser)
            toast.success('Post deleted successfully!')
        }
        catch(err){
            console.log("Error occured while deleting the post: "+err)
            toast.error("Faced probelm while deleting post")
        }
    }

    return (
        <>
            <div className='flex flex-wrap sm:flex-row gap-2 px-[1vmax] py-[.6vmax] rounded-md bg-[#303d69] justify-between items-center overflow-hidden'>
                <div className='flex flex-row gap-1 w-[40%] sm:gap-3 items-center'>
                    <img className="h-5 w-5 sm:h-5 sm:w-7 md:h-12 md:w-12 rounded-full object-cover" src={Data.img} alt='user' />

                    <p className='h-auto w-auto font-semibold text-[.9vmax] md:text-[1.2vmax] p-[.4vmax] text-zinc-50'>
                        {Data.name}
                    </p>

                    <p className='h-auto w-auto font-semibold text-[.9vmax] md:text-[1.2vmax] p-[.4vmax] text-zinc-50'>
                        {Data.email}
                    </p>

                </div>
                    <p className='h-auto w-auto font-semibold text-[.9vmax] md:text-[1.2vmax] p-[.4vmax] text-zinc-50'>
                        {`Post: ${Data.post.length}`}
                    </p>
                {/* <div className='flex flex-row gap-5'> */}

                <button className='m-0 w-[100%] sm:w-auto md:m-0 p-[.5vmax] rounded-md text-zinc-50 font-semibold text-[.9vmax] md:text-[1.2vmax] bg-logoutLite hover:bg-logoutDark hover:cursor-pointer' onClick={handleDleteUser}>Remove</button>
                {/* </div> */}
            </div>
        </>
    )
}

//Post Card
export const PostCard = ({Data, reloadPost, setReloadPost}) => {
    
    const [read, setRead]=useState(0)
    
    const handleDletePost=async()=>{
        // console.log(Data._id, Data.email)
        try{
            await axios.post(import.meta.env.VITE_BACKEND_ADMIN+'/delete/post',{
                _id: Data._id,
                email: Data.email
            },{withCredentials: true})
            setReloadPost(!reloadPost)
            toast.success('Post deleted successfully!')
            // Data.Data.setRealod(!Data.Data.realod)
        }
        catch(err){
            console.log("Error occured while deleting the post: "+err)
            toast.error("Faced probelm while deleting post")
        }
    }

    return (
        <>
            <div className='p-[.6vmax] flex flex-col gap-1 rounded-md bg-[#303d69] overflow-hidden'>
                <div className='flex flex-row items-center gap-2 justify-between'>                   
                    <div className='flex flex-row gap-3 pb-[1vmax]'>
                        <img className="h-6 w-6 sm:h-6 sm:w-6 md:h-12 md:w-12 rounded-full object-cover" src={Data.img} alt='user' />
                        <div className='flex flex-col'>
                            <p className='h-auto w-auto font-semibold text-[.9vmax] md:text-[1.2vmax] text-zinc-50'>
                                {Data.name}
                            </p>
                            <p className='h-auto w-auto font-semibold text-[.9vmax] md:text-[1.2vmax] text-zinc-50'>
                                {Data.email}
                            </p>
                        </div>
                    </div>

                    <button className='m-0 p-[.5vmax] rounded-sm md:rounded-md text-zinc-50 font-semibold text-[.7vmax] sm:text-[1.2vmax] bg-logoutLite hover:bg-logoutDark hover:cursor-pointer' onClick={handleDletePost}>Remove</button>
                </div>
               
                <p className={`text-[.9vmax] md:text-[1.3vmax] ${read?'h-auto':'h-[25px] md:h-[50px]'} text-zinc-200 p-[1vmax] bg-[#0c173570] rounded-md overflow-y-hidden`}>
                    <p className='h-auto w-auto font-semibold text-[.9vmax] md:text-[1.4vmax] text-zinc-50'>
                    {`Title: ${Data.title}`}
                    </p>
                    {Data.content}
                </p>
                <button className='p-[.5vmax] rounded-sm md:rounded-md text-zinc-50 font-semibold text-[.7vmax] sm:text-[1.2vmax] bg-[#181f6188] hover:bg-[#080d3a75] hover:cursor-pointer m-auto' onClick={()=>setRead(!read)}>{read?"Read less":"Read more"}</button>
            </div>
        </>
    )
}

export default Admin

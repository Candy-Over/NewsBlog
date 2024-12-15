import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import { TbFileSad } from "react-icons/tb";
import { BiSolidErrorAlt } from "react-icons/bi";
import { MdNewspaper } from "react-icons/md";

const SearchPage = () => {
    const [news, setNews]=useState(null)
    const navigate=useNavigate()
    const { id } =useParams()
    useEffect(()=>{
        const link=`https://newsapi.org/v2/everything?q=${id}&sortBy=popularity&apiKey=${import.meta.env.VITE_APIKEY}`
        const fetchAPI=async ()=>{
            try{
                const data=await axios(link)
                // console.log(data.data.articles)
                setNews(data.data.articles)
            }
            catch(err){
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
        fetchAPI()
    },[id])  
  
    if(!news){
        return(
            <Loader />
        )
    }

    if(news.length==0){
        return(
            <>
                <div className='flex flex-col bg-liteBack h-[100vh] gap-6 justify-center items-center p-[3max] '>
                    <TbFileSad className='text-zinc-50 text-[20vmin]'/>
                    <p className='text-zinc-50 text-[1.6vmax] font-semibold'>No news found for '{id}'</p>
                    <button className='p-[1vmax] rounded-md text-[1.1vmax] font-medium text-[white] bg-[#0EA5E9] hover:text-[1.3vmax] ease-in duration-300' onClick={()=>navigate("/")}>Back to home</button>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-4 bg-liteBack min-h-screen p-[2vmax] overflow-hidden bor">
                {
                    news.map((data, _)=><Card key={_} data={ data }/>)
                }
            </div> 
        </>
    )
}

export const Card=( {data} )=>{
    return(
        <>
            <a href={data.url}>
            <div className='p-[1vmax] w-full flex flex-row items-center gap-6 text-zinc-50 bg-darkBack hover:bg-[#070d27] hiver:ease-in duration-300'>
                {
                    data.urlToImage?
                    <img className="h-[13vh] w-[35vw] md:h-[30vh] md:w-[30vw] rounded" src={data.urlToImage}/>
                    :<MdNewspaper className="h-[13vh] w-[35vw] md:h-[30vh]  rounded"/>
                }
                <div className='flex flex-col gap-4'>
                    <p className='text-[1.6vmax] font-medium md:font-bold'>{data.title}</p>
                    <p className='hidden text-[1.1vmax] font-medium text-[#aaaaaa] md:block'>{data.description}</p>
                </div>
            </div>
            </a>
        </>
    )
}

export default SearchPage
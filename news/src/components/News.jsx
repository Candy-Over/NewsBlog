import React, { useContext, useEffect, useState } from "react";
// import HeadlineCard from "./HeadlineCard";
import Head from "./Head";
import GeneralNews from "./GeneralNews";
import OtherNews from "./OtherNews";
import { MyContext } from "../contextApi";
import { Buisness } from "../buisness";
import { General } from "./General";
import Loader from "./Loader";
import { BiSolidErrorAlt } from "react-icons/bi";
// import { IoIosArrowBack } from "react-icons/io";
// import { IoIosArrowForward } from "react-icons/io";

const News=()=>{

    const { headlines, colour, general, business, sports, entertainment, health, science, technology, error }=useContext(MyContext)

    const [shift, setshift]=useState(0)
    const [end, setEnd]=useState(0)
    console.log(error)
    useEffect(()=>{
        if(headlines){
        //  console.log(buisness)  
        }
    },[headlines])

    // if(headlines){
    //     // setNews(headlines.Headline.articles)
    //     // console.log(headlines.Headline.articles)
    //     // console.log(headlines.Headline.articles.length)
    // }

    // setInterval(()=>{
    //     setshift((shift+1)%end)
    // },4000)
    const goLeft=()=>{
        if(shift==0){
            setshift(end-1)
        }
        else{
            setshift((shift-1)%end)
        }
    }

    const goRight=()=>{
        setshift((shift+1)%end)
    }
    if(error){
        return(
            <>
                <div className='flex flex-col bg-liteBack h-[100vh] gap-6 justify-center items-center p-[3max] '>
                    <BiSolidErrorAlt className='text-zinc-50 text-[20vmin]'/>
                    <p className='text-zinc-50 text-[1.6vmax] font-semibold'>Request limit reached</p>
                </div>
            </> 
        )
    }
    return(
        <> 
        {
            headlines?

            <div className="flex flex-col gap-6 items-center bg-[#c4cde4] min-h-screen pt-[1vmax] pb-[5vmax] overflow-hidden">

                {/* <Head Data={ headlines } colour={ colour } /> */}
                {
                    headlines?<Head Data={ headlines } colour={ colour } />:<></>
                }
                
                {/* <div className="relative">
                    <div className="relative">
                        {   
                            // it is for the api
                            headlines ? <HeadlineCard data={ headlines[shift] } colour={colour} /> : <p>Loading</p>

                            // it is for testing
                            // headlines ? <HeadlineCard data={ headlines.Headline.articles[shift] } colour={colour} /> : <p>Loading</p>
                        }
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="flex flex-row items-center justify-between h-full">
                            <IoIosArrowBack className="bg-[#00000054] text-[#d3d3d3] text-[4vmax] hover:cursor-pointer p-[5] sm:bg-[#000000e1] rounded" onClick={goLeft}/>
                            <IoIosArrowForward className="bg-[#00000054] text-[#d3d3d3] text-[4vmax] hover:cursor-pointer p-[5] sm:bg-[#000000e1] rounded" onClick={goRight}/>
                        </div>
                    </div>
                </div> */}
                
                {/* <GeneralNews Data={ General.articles }/> */}
                
                {
                    general?<GeneralNews Data={ general[1] }/>:<></>
                }
                
                {/* <OtherNews Name={"Buisness"} Data={Buisness.articles} />  */}
                
                {/* business */}
                {
                    business?<OtherNews Name={business[0]} Data={business[1]} />:<></>
                }
                
                {/* health */}
                {
                    health?<OtherNews Name={health[0]} Data={health[1]} />:<></>
                }

                {/* EnterTainment */}
                {
                    entertainment?<OtherNews Name={entertainment[0]} Data={entertainment[1]} />:<></>
                }
                
                {/* Sports */}
                {
                    sports?<OtherNews Name={sports[0]} Data={sports[1]} />:<></>
                }

                {/* Science */}
                {
                    science?<OtherNews Name={science[0]} Data={science[1]} />:<></>
                }

                {/* Technology */}
                {
                    technology?<OtherNews Name={technology[0]} Data={technology[1]} />:<></>
                }
            </div>

             :<Loader />
            }
        </>
    )
}

export default News
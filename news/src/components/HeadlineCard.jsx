import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"


const HeadlineCard = ({ data, colour }) => {
    const [cardColor, setCardColor]=useState(colour[0])
    useEffect(()=>{
        setCardColor(colour[Math.ceil(Math.random()*(5))])
    },[])
   
  return (
    <>
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.5 }}
        >
            {/* <div className="h-[25vmax] w-[92vw] sm:mx-[3vmax] sm:h-[37vmax] sm:w-[92vw] bg-[#3b7fcc] rounded absolute"> */}
            {/* colour[Math.ceil(Math.random(0,6))] */}
            <div className={`h-[25vmax] w-[92vw] sm:mx-[3vmax] sm:h-[37vmax] sm:w-[92vw] bg-${"customCardOrange"} rounded absolute`} style={{backgroundColor: `${colour[Math.ceil(Math.random()*(colour.length-1))]}`}}>
                {/* <p className="p-[4vmax] font-bold text-[#ffff] text-[2vmax]"></p> */}
                {
                        data.urlToImage?
                <img className="h-[25vmax] w-[92vw] rounded sm:h-[37vmax] sm:w-[92vw] " src={data.urlToImage}/>:
                <></>
                }
            </div>

            <div className="p-[4vmax] h-[25vmax] w-[92vw] sm:mx-[3vmax] sm:h-[37vmax] sm:w-[92vw] bg-gradient-to-b from-[#fff0] to-[#000000b4] rounded relative flex flex-col gap-4">
                <div className="flex flex-col items-start gap-y-[2vh] bg-[#27272742] h-[100vh] w-[50vw]">
                    {/* <p className="font-medium text-[#ffff] text-[1.3vmax] ">{data.author}</p> */}
                    {/* <br/> */}
                    <p className="text-[#ffff] px-3 font-bold text-[1.6vmax] sm:text-[2.7vmax]">{data.title}</p>
                    <a href={data.url} className="text-[1vmax] p-[.5vmax] py-[.4vmax] bg-[#ffa600] text-center rounded-r font-bold sm:text-[1vmax] sm:px-[1vmax] sm:py-[.4vmax] hover:cursor-pointer">READ MORE</a>
                </div>
            </div>

        </motion.div>
    </>
  );
};

export default HeadlineCard;

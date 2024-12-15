import React from 'react'
import { FaRegNewspaper } from "react-icons/fa";

const GeneralNewsCard = ( {data} ) => {

    return (
        <>
            <a href={data.url}>
                <div className='h-[auto] bg-[#1f1f1f] rounded flex flex-row p-[1.3vmax] items-center gap-1 mx-[1vmax]'>
                    <FaRegNewspaper className='text-[white] text-[5vmax]'/>
                    <p className='text-[1.3vmax] font-medium text-[#ececec] p-[1.3vmax]'>{data.title}</p>
                    {

                    }
                </div>
            </a>
        </>
    )
}

export default GeneralNewsCard

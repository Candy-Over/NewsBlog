import React, { useContext } from 'react'
import { MyContext } from '../contextApi'

const OtherNewsCard = ( { data } ) => {
    const { colour }=useContext(MyContext)
    return (
        <>
            <a href={data.url}>
                <div className='bg-customCardOrange h-[45vmin] flex flex-col mx-[.4vmax] sm:h-[45vh] md:h-[35vmin] lg-[45vmin] rounded relative'>
                    {
                        data.urlToImage?<img className="h-[45vh] sm:h-[45vh] rounded" src={data.urlToImage} relative/>:
                        <div className='h-[45vh] sm:h-[45vh] rounded relative' style={{ backgroundColor: `${colour[Math.ceil(Math.random()*colour.length-1)]}` }}>
                        </div>
                    }
                    {/* {
                        data.urlToImage?<img className="h-[45vh] sm:h-[45vh]" src={data.urlToImage} relative/>:
                        <img className="h-[45vh] sm:h-[45vh]" src="https://thumbs.dreamstime.com/b/business-news-24223829.jpg" relative/>
                    } */}
                    <p className='text-[#ffffff] absolute p-[1.3vmax] text-[1.3vmax] bottom-0 bg-gradient-to-b from-[#8f8f8f73] to-[black] rounded-b '>{data.title}</p>
                </div>
            </a>
        </>
    )
}

export default OtherNewsCard
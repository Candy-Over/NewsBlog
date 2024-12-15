import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import HeadlineCard from './HeadlineCard'

export default function Head({Data, colour}) {
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        
    };
    
    const [data, setData]=useState(null)
    useEffect(()=>{
      if(Data){
        setData(Data)
        console.log(data)
      }
    },[])

    return (
        <>
            <div className='w-[100vw] px-[3.5vmax]'>
            {
                data?
                
                    <Slider {...settings}>
                        {
                            data.map((i,_)=><HeadlineCard data={i} colour={ colour } />)
                        }
                    </Slider>:<></>
                
            }
            </div>
        </>
    )
}

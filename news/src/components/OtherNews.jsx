import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import OtherNewsCard from "./OtherNewsCard";


const OtherNews =({Name, Data})=>{
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };
    
    const [data, setData]=useState(null)
    useEffect(()=>{
      if(Data){
        setData(Data)
      }
    },[])

    return(
      <>
        <div className=" flex flex-col items-start">
          <p className=" px-[1vmax] bg-liteBack font-medium text-white text-[1.7vmax] rounded-tr-lg">{Name}</p>
          <div className="h-[.4vmax] w-[92vw] bg-liteBack"></div>
        </div>

        {
          data?
          <div className="h-[auto] w-[100vw] px-[3.5vmax]">
            <Slider {...settings}>
                {
                    data.map((i,_)=>{
                        return(
                          <OtherNewsCard key={_} data={ i }/>
                        )
                    })
                }
            </Slider>
          </div>:<></>
        }
      </>
    )
}

export default OtherNews
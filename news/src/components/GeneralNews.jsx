import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import GeneralNewsCard from './GeneralNewsCard';


const GeneralNews=({Data})=>{
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
      }
    },[])

    return(
      <>

        {
          data?
          <div className="h-[auto] w-[100vw] px-[3.5vmax]">
            <Slider {...settings}>
                {
                    data.map((i,_)=>{
                        return(
                          <GeneralNewsCard key={_} data={ i }/>
                        )
                    })
                }
            </Slider>
          </div>:<></>
        }
      </>
    )
}

export default GeneralNews
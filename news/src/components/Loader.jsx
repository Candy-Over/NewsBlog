import React from "react";
import "../index.css"

const Loader=()=>{
    return(
        <div className="h-[100vh] bg-[#111725] flex justify-center items-center">
            <span className="loader"></span>
        </div>
    )
}

export default Loader
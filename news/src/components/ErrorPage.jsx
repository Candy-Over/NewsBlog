import React from 'react'
import { GiBreakingChain } from "react-icons/gi";

function ErrorPage() {
  return (
    <>
        <div className='flex flex-col bg-darkBack min-h-screen gap-6 justify-center items-center p-[3max] '>
            <GiBreakingChain className='text-zinc-50 text-[20vmin]'/>
            <div className='flex flex-col gap-1 items-center'>
                <p className='text-zinc-50 text-[3vmax] font-semibold'>404</p>
                <p className='text-zinc-50 text-[1.6vmax] font-semibold'>Page not found</p>
            </div>
        </div>      
    </>
  )
}

export default ErrorPage

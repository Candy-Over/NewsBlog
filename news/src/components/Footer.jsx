import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='h-[10vh] p-[3vmax] bg-darkBack bottom-0 flex flex-col ga-3 justify-center items-center'>
                <p className='text-zinc-300 font-medium text-[1.3vmax]'>&#xA9;NewsBlog</p>
                <Link to="/login/admin" className='text-customDarkBlue font-medium text-[1.3vmax] hover:cursor-pointer'>Admin</Link>
            </div>
        </>
    )
}

export default Footer

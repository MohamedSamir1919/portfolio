import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div className='w-screen h-[50px] p-4 flex justify-between items-center fixed top-0 left-0 z-[9999] bg-gradient-to-tr from-gray-900 to-black text-white'>
       <div className=''>
        
       
        <h1 className='font-black text-xl text-transparent [-webkit-text-stroke:2px_white]'>Mo Sa</h1>
       </div>
       <div className='flex min-w-[200px] justify-evenly items-center'>
       <NavLink to={'/'}>
       Portfolio
       </NavLink> 
        <NavLink to={'/about'}>
       About
       </NavLink> 
       </div>
        </div>
  )
}

export default Navbar
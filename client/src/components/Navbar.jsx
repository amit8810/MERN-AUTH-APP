import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='flex bg-purple-600 px-5 py-3 justify-between'>
        <h2 className='font-bold text-center text-white'>MERN AUTHENTICATION APP</h2>
        <div className='flex gap-5'>
            <NavLink to='/' className={`text-white`}>Home</NavLink>
            <NavLink to='/signup' className={`text-white`}>Signup</NavLink>
            <NavLink to='/login' className={`text-white`}>Login</NavLink>
        </div>
    </div>
  )
}

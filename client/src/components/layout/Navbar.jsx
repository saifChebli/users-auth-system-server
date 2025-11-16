import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {

  const { user , logout } = useAuth()

  return (
    <div className='bg-white shadow flex justify-between items-center px-6 py-4'>
      <h1 className='text-xl font-bold'>Welcome {user?.name} </h1>
      <button onClick={logout} className='bg-red-500 text-white px-3 py-1 rounded'>Logout</button>
    </div>
  )
}

export default Navbar
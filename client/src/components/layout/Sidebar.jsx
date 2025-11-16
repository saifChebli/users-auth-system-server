import React from 'react'
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='w-64 bg-white shadow p-4'>
      <h2 className='font-bold text-lg mb-6'>Dashboard</h2>
        <nav className='space-y-3'>
            <Link to="/dashboard" className='block hover:bg-gray-200 rounded px-3 py-2'>Home</Link>
            <Link to="/profile" className='block hover:bg-gray-200 rounded px-3 py-2'>Profile</Link>

            <Link to="/users-management" className='block hover:bg-gray-200 rounded px-3 py-2'>Users Management</Link>
        </nav>
    </div>
  )
}

export default Sidebar
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {

const { user , logout } = useAuth()

console.log(user)
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
     <div className='bg-white shadow-lg rounded-md w-96 text-center p-6'>

      <h1 className='font-bold text-2xl mb-2'>Welcome {user?.name}</h1>
      <p>Email : {user?.email}</p>
      <button onClick={logout} className='bg-red-400 text-white cursor-pointer px-4 py-2 rounded mt-3'>Logout</button>
     </div>
    </div>
  )
}

export default Dashboard
import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/api'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Login = () => {

const [form , setForm] = useState({
  email : "",
  password : ""
})

const { login } = useAuth()

const navigate = useNavigate()

const handleLogin = async (e) => {
  e.preventDefault()
  try {
    const response = await API.post("/auth/login" , form)
    if(response.status === 200){
      console.log(response.data)
      login(response.data)
      navigate("/dashboard")
    }
  } catch (error) {
    console.log(error)
    toast.error("Problem when you try to login !")
  }
}


  return (
 <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold my-4">Welcome Back</h2>
        <input
          value={form.email}
          onChange={(e) => setForm({...form , email : e.target.value})}
          type="email"
          placeholder="Email"
          className="w-full border border-gray-200 p-2 mb-3"
        />
        <input
          value={form.password}
          onChange={(e) => setForm({...form , password : e.target.value})}
          type="password"
          placeholder="Password"
          className="w-full border border-gray-200 p-2 mb-3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Login
        </button>
      <div className="mt-4">
        <span>Create a new account ! <Link className="text-blue-400" to="/register">Register</Link></span>
      </div>
      </form>
      
    </div>
  )
}

export default Login
import React, { useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const [form , setForm] = useState({ name : "" , email : "" , password : "" })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await API.post("/auth/sign-up", form);
      if (response.status === 201) {
        toast.success(response.data.message);
        setForm({name : "" , email : "" , password : "" })
      }
      navigate("/login")
    } catch (error) {
      toast.error("Problem when trying to create account");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold my-4">Register</h2>
        <input
          value={form.name}
          onChange={(e) => setForm({...form , name : e.target.value})}
          type="text"
          placeholder="Name"
          className="w-full border border-gray-200 p-2 mb-3"
        />
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
          Register
        </button>
      <div className="mt-4">
        <span>Already have an account ? <Link className="text-blue-400" to="/login">Login</Link></span>
      </div>
      </form>
      
    </div>
  );
};

export default Register;

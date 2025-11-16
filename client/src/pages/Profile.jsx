import React, { useEffect, useState } from "react";
import userAvatar from "../assets/default-avatar.png";
import { useAuth } from '../context/AuthContext'
import API from "../api/api";

const Profile = () => {

    const { user , setUser } = useAuth()

    const [name , setName] = useState(user?.name || "")
    const [email , setEmail] = useState(user?.email || "")

  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setName(response.data.name)
      setEmail(response.data.email)

    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  console.log(user)
  return (
    <div>
      <h1>My Profile</h1>
      <div className="flex flex-col items-center mb-4">
        <img src={`http://localhost:5000/${user.photo}` || userAvatar} alt="" className="w-32 h-32 rounded-full" />

        <label
          htmlFor="image"
          className="bg-blue-500 mt-4 cursor-pointer text-white rounded-lg px-4 py-2"
        >
          Change Photo
          <input type="file" className="hidden" />
        </label>
      </div>
      <div className="space-y-4">
        <input
          className="w-full p-3 border rounded-lg"
          type="text"
          placeholder="Your Name"
          value={name}
        />
        <input
          className="w-full p-3 border rounded-lg"
          type="text"
          placeholder="Your Email"
          value={email}
        />

        <button className="bg-green-500 mt-5 w-full text-white rounded-lg p-3">
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;

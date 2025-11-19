import React, { useEffect, useState } from "react";
import userAvatar from "../assets/default-avatar.png";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [profilePicture , setProfilePicture] = useState(user?.photo || "")

  const token = localStorage.getItem("token");

  const getUserProfile = async () => {
    try {
      

      const response = await API.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setProfilePicture(response.data.photo)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  console.log(user);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);

      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await API.put("/users/update-me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  return (
    <div>
      <h1>My Profile</h1>
      <div className="flex flex-col items-center mb-4">
        <img src={`http://localhost:5000/uploads/profile/user-1763583519028.png`} alt="" className="w-32 h-32 rounded-full" />

        <label
          htmlFor="image"
          className="bg-blue-500 mt-4 cursor-pointer text-white rounded-lg px-4 py-2"
        >
          Change Photo
        </label>
        <input
          type="file"
          className="border border-gray-200 p-2 my-2"
          onChange={handlePhoto}
        />
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

        <button
          onClick={updateProfile}
          className="bg-green-500 mt-5 w-full text-white rounded-lg p-3"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const UserDetails = ({ userData }) => {
  const dispatch = useDispatch();
  const [user, setuser] = useState(userData);
  const [password, setPassword] = useState(""); // handle separately

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setuser((prev) => ({
        ...prev,
        profile: files[0], // store file
      }));
    } else {
      setuser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...user.skill];
    newSkills[index] = value;
    setuser({ ...user, skill: newSkills });
  };

  const addSkill = () => {
    setuser({ ...user, skill: [...user.skill, ""] });
  };

  const removeSkill = (index) => {
    const newSkills = user.skill.filter((_, i) => i !== index);
    setuser({ ...user, skill: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", user.name);
    data.append("email", user.email);
    data.append("phone", user.phone);
    data.append("bio", user.bio);
    if(password.length > 0){
      data.append("password", password); // only send new password
      if(password.length < 6){
        toast.error("Password must be greater or equal to 6 digit.", {
                            position: "top-center"
                        });
        return;
      }
    }
    
    user.skill.forEach((s) => data.append("skill", s));
    if (user.profile instanceof File) {
      data.append("profile", user.profile);
    }
    console.log("Form Data => " + data);
    await axios.put(`http://localhost:5000/updateUser/${user._id}`, data)
      .then(response => {
        if (response.data != "error") {
          dispatch(setUser(response.data))
          toast.success("Data updated.", {
            position: "top-center"
        });
        }
      })
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">About yourself</h2>
      <p className="text-gray-500 mb-6">Fill out your primary information.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture Upload */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={
                user.profile instanceof File
                  ? URL.createObjectURL(user.profile)
                  : `http://localhost:5000/${user.profile}`
              }
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
            />
            <label
              htmlFor="profile-picture-upload"
              className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-1 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              name="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            onClick={() => document.getElementById("profile-picture-upload").click()}
            className="text-blue-500 font-semibold hover:text-blue-600"
          >
            Edit Profile Picture
          </button>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name*</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio*</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills*</label>
          {user.skill.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full p-2 rounded border"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded text-white"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-white mt-2"
          >
            + Add Skill
          </button>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email*</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone*</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserDetails;

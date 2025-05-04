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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
        <p className="text-gray-500 mt-1">Update your personal information and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative group">
            <img
              src={
                user.profile instanceof File
                  ? URL.createObjectURL(user.profile)
                  : `http://localhost:5000/${user.profile}`
              }
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover group-hover:opacity-90 transition-opacity"
            />
            <label
              htmlFor="profile-picture-upload"
              className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1.5 cursor-pointer shadow-sm hover:bg-purple-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
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
          <div>
            <h3 className="font-medium text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
              placeholder="••••••••"
            />
            {password.length > 0 && password.length < 6 && (
              <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
            rows="4"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">Skills</label>
            <button
              type="button"
              onClick={addSkill}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Skill
            </button>
          </div>
          
          <div className="space-y-3">
            {user.skill.map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                  placeholder="Skill name"
                />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="p-2 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            Save Changes
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserDetails;
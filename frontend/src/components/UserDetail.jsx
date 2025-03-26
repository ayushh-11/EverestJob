import React, { useState } from "react";

const UserDetails = () => {
  const [user, setUser] = useState({
    id: "12345",
    name: "John Doe",
    profile: "Software Developer",
    skills: ["React", "Node.js", "MongoDB"],
    email: "johndoe@example.com",
    password: "********",
    phone: "9876543210",
    profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...user.skills];
    newSkills[index] = value;
    setUser({ ...user, skills: newSkills });
  };

  const addSkill = () => {
    setUser({ ...user, skills: [...user.skills, ""] });
  };

  const removeSkill = (index) => {
    const newSkills = user.skills.filter((_, i) => i !== index);
    setUser({ ...user, skills: newSkills });
  };

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data Submitted:", user);
    alert("User details submitted successfully!");
  };

  return (
    <div className="bg-white p-8 rounded-lg  w-full mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">About yourself</h2>
      <p className="text-gray-500 mb-6">Fill out your primary information.</p>

      {/* Profile Picture Upload */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
          />
          <label
            htmlFor="profile-picture-upload"
            className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
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
            accept="image/*"
            className="hidden"
            onChange={handlePictureUpload}
          />
        </div>
        <button
          onClick={() => document.getElementById("profile-picture-upload").click()}
          className="text-blue-500 font-semibold hover:text-blue-600"
        >
          Upload Profile Picture
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name*</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Profile */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile*</label>
          <input
            type="text"
            name="profile"
            value={user.profile}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills*</label>
          {user.skills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                onClick={() => removeSkill(index)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded text-white transition-colors"
              >
                X
              </button>
            </div>
          ))}
          <button
            onClick={addSkill}
            className="bg-gray-800 hover:bg-gray-700 cursor-pointer px-4 py-2 rounded text-white"
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
            className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password*</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
            className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded text-white cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
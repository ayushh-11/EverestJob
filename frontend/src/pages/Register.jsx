import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        profile: null,
        email: "",
        password: "",
        phone: "",
        bio: "",
        skill: [],
    });

    const [skillInput, setSkillInput] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePic") {
            setFormData((prev) => ({
                ...prev,
                profile: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const trimmed = skillInput.trim();
            if (trimmed && !formData.skill.includes(trimmed)) {
                setFormData((prev) => ({
                    ...prev,
                    skill: [...prev.skill, trimmed],
                }));
                setSkillInput("");
            }
        }
    };

    const handleRemoveSkill = (index) => {
        setFormData((prev) => ({
            ...prev,
            skill: prev.skill.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "skill") {
                value.forEach(skill => data.append("skill", skill));
            } else {
                data.append(key, value);
            }
        });


        axios.post("http://localhost:5000/createUser", data)
            .then(response => {
                if(response.data == "exist"){
                                    toast.error("Email is taken", {
                                        position: "top-center"
                                    });
                                    return;
                                }
                if (response.data == "success") {
                    
                    toast.success("Registration successful! 🎉", {
                        position: "top-center"
                    });
                }
            })
            .catch(error => {
                toast.error("Something went wrong. 😢", {
                    position: "top-center"
                });
                console.error(error);
            })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Platform</h1>
                    <p className="text-gray-500">Create your account in just a few steps</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Upload */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative group">
                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                {formData.profile ? (
                                    <img
                                        src={URL.createObjectURL(formData.profile)}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}
                            </div>
                            <label
                                htmlFor="profilePic"
                                className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 cursor-pointer shadow-sm hover:bg-purple-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    id="profilePic"
                                    type="file"
                                    name="profilePic"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800">Profile Photo</h3>
                            <p className="text-sm text-gray-500"></p>
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        {/* Email & Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
                                placeholder="+1 555 000 0000"
                                required
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
                            rows="4"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700">Skills</label>
                            <span className="text-sm text-gray-500">Press Enter or comma to add</span>
                        </div>
                        <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handleSkillKeyDown}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
                            placeholder="React, Node.js, Python..."
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                            {formData.skill.map((s, index) => (
                                <div key={index} className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full flex items-center gap-2">
                                    <span>{s}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(index)}
                                        className="text-purple-500 hover:text-purple-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-gray-800 text-white py-4 rounded-lg font-medium hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link 
                        to="/login" 
                        className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center gap-2"
                    >
                        <span>Already have an account?</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;
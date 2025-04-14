import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


function Register() {
    const Navigate = useNavigate();
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
                if (response.data) {
                    console.log(response.data);
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
                        <input onChange={handleChange} type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                    </div>

                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input onChange={handleChange} type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input onChange={handleChange} type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                        <input onChange={handleChange} type="tel" id="phone" name="phone" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">Bio</label>
                        <textarea onChange={handleChange} id="bio" name="bio" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="skills" className="block text-gray-700 font-bold mb-2">Skills (Press Enter or Comma to add)</label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handleSkillKeyDown}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                        />
                        <div className="flex flex-wrap mt-2">
                            {formData.skill.map((s, index) => (
                                <div key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
                                    {s}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="profilePic" className="block text-gray-700 font-bold mb-2">Profile Picture</label>
                        <input onChange={handleChange} type="file" id="profilePic" name="profilePic" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" />
                    </div>

                    <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Register</button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/login" className="block w-full bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400 text-center">Already have an account? Login</Link>
                </div>
            </div>
            <div className="mt-10 text-center">
                <Link to="/" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 cursor-pointer">Go to Home</Link>
            </div>
            <ToastContainer />

        </div>
    );
}

export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function CompanyRegister() {
    const [formData, setFormData] = useState({
        name: "",
        profile: null,
        email: "",
        password: "",
        phone: "",
        description: "",
        specialities: [],
    });

    const [specialitiesInput, setspecialitiesInput] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePic") {
            setFormData((prev) => ({
                ...prev,
                logo: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handlespecialitiesKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const trimmed = specialitiesInput.trim();
            if (trimmed && !formData.specialities.includes(trimmed)) {
                setFormData((prev) => ({
                    ...prev,
                    specialities: [...prev.specialities, trimmed],
                }));
                setspecialitiesInput("");
            }
        }
    };

    const handleRemovespecialities = (index) => {
        setFormData((prev) => ({
            ...prev,
            specialities: prev.specialities.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "specialities") {
                value.forEach(specialities => data.append("specialities", specialities));
            } else {
                data.append(key, value);
            }
        });


        axios.post("http://localhost:5000/createCompany", data)
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Registration</h1>
                    <p className="text-gray-500">Start hiring talented candidates today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Logo Upload */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative group">
                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                {formData.logo ? (
                                    <img
                                        src={URL.createObjectURL(formData.logo)}
                                        alt="Logo Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0H3" />
                                    </svg>
                                )}
                            </div>
                            <label
                                htmlFor="profilePic"
                                className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-2 cursor-pointer shadow-sm hover:bg-gray-800 transition-colors"
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
                            <h3 className="font-medium text-gray-800">Company Logo</h3>
                            <p className="text-sm text-gray-500">JPEG or PNG, 1MB max</p>
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-100 focus:border-gray-500 transition-all"
                                placeholder="Acme Corp"
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-100 focus:border-gray-500 transition-all"
                                placeholder="contact@company.com"
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-100 focus:border-gray-500 transition-all"
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-100 focus:border-gray-500 transition-all"
                                placeholder="+1 555 000 0000"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-100 focus:border-gray-500 transition-all"
                            rows="4"
                            placeholder="Describe your company's mission and values..."
                        />
                    </div>

                    {/* Specialities */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700">Specialities</label>
                            <span className="text-sm text-gray-500">Press Enter or comma to add</span>
                        </div>
                        <input
                            type="text"
                            value={specialitiesInput}
                            onChange={(e) => setspecialitiesInput(e.target.value)}
                            onKeyDown={handlespecialitiesKeyDown}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-100 focus:border-gray-500 transition-all"
                            placeholder="Technology, Recruitment, Consulting..."
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                            {formData.specialities.map((s, index) => (
                                <div key={index} className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full flex items-center gap-2">
                                    <span>{s}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemovespecialities(index)}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
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
                        className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white py-4 rounded-lg font-medium hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl"
                    >
                        Register Company
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link 
                        to="/companyLogin" 
                        className="text-gray-600 hover:text-gray-800 font-medium inline-flex items-center gap-2"
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

export default CompanyRegister;
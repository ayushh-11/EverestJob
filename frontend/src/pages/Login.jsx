import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { FaRegUser } from "react-icons/fa";

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handLogin = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/loginUser", { email, password })
            .then(result => {
                if (result.data !== "error") {
                    dispatch(setUser(result.data));
                    navigate("/index")
                }
                else {
                    console.log("Credential Error")
                    toast.error("Invalid Credentials", {
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
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-purple-100 p-4 rounded-full mb-4">
                        <FaRegUser className="w-8 h-8 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Candidate Login</h2>
                    <p className="text-gray-500 mt-2">Welcome back! Please sign in to continue</p>
                </div>
    
                <form onSubmit={handLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
                            placeholder="john@example.com"
                            required 
                        />
                    </div>
    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="password" 
                            name="password" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all"
                            placeholder="••••••••"
                            required 
                        />
                    </div>
    
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-white py-3.5 rounded-lg font-medium hover:from-gray-800 hover:to-gray-700 transition-all shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>
                </form>
    
                <div className="mt-6 text-center">
                    <Link 
                        to="/register" 
                        className="text-gray-600 hover:text-gray-800 font-medium inline-flex items-center gap-2 transition-colors"
                    >
                        <span>Don't have an account?</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
    
                <div className="mt-8 text-center">
                    <Link 
                        to="/" 
                        className="inline-flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2.5 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all shadow-md hover:shadow-lg"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Go to Home
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;

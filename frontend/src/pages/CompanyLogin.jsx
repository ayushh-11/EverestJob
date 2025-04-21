import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setCompany } from '../redux/companySlice';

function CompanyLogin() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handLogin = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/loginCompany", { email, password })
            .then(result => {
                if (result.data != "error") {
                    console.log(result.data)
                    dispatch(setCompany(result.data));
                    navigate("/company")
                }
                else
                    toast.error("Invalid Credentials", {
                        position: "top-center"
                    });
            })
            .catch(error => {
                            toast.error("Something went wrong. 😢", {
                                position: "top-center"
                            });
                            console.error(error);
                        })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Login as Company</h2>
                <form onSubmit={handLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                    </div>
                    <button type="submit" className="w-full cursor-pointer bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Login</button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/companyRegister" className="w-full block cursor-pointer bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Create New Account</Link>
                </div>
            </div>
            <div className="mt-10 text-center">
                <Link to="/" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 cursor-pointer">Go to Home</Link>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CompanyLogin
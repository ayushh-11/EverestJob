import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Register</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="block text-gray-700 font-bold mb-2">Full Name</label>
                        <input type="text" id="fullname" name="fullname" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                    </div>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
                            <input type="text" id="location" name="location" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
                            <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">Bio</label>
                        <textarea id="bio" name="bio" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="profilePic" className="block text-gray-700 font-bold mb-2">Profile Picture</label>
                        <input type="file" id="profilePic" name="profilePic" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" />
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
        </div>
    );
}

export default Register;

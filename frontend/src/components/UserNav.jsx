import React,{useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

function UserNav() {
  const location = useLocation(); // Hook to get the current route location
  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  const userData = useSelector((state) => state.user.user) || [];
  
   
  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-900 text-white text-sm font-bold p-2.5 shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src="logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
          <h1 className="text-lg font-bold text-white">Everest Job</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link
            to="/index"
            className={`hover:text-gray-400 transition-colors duration-200 ${
              isActive('/index') ? 'border-b-2 border-white' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/category"
            className={`hover:text-gray-400 transition-colors duration-200 ${
              isActive('/category') ? 'border-b-2 border-white' : ''
            }`}
          >
            Category
          </Link>
          <Link
            to="/explore"
            className={`hover:text-gray-400 transition-colors duration-200 ${
              isActive('/explore') ? 'border-b-2 border-white' : ''
            }`}
          >
            Explore
          </Link>
        </div>

        {/* Actions (Profile & Logout) */}
        <div className="flex gap-4">
          <Link
            to="/profile"
            className="px-3 py-1 rounded-md hover:bg-gray-800 cursor-pointer text-3xl text-white"
          >
            <img className="h-10 w-10 rounded-full" src={`http://localhost:5000/${userData.profile}`} />
          </Link>
          <Link
            to="/login"
            className="bg-white text-gray-900 px-4 py-3 rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer font-semibold"
          >
            Logout
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default UserNav;
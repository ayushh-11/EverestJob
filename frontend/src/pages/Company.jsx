import React, { useState } from "react";
import CompanyDetail from "../components/CompanyDetail";
import Dashboard from "../components/Dashboard";
import JobPosted from "../components/JobPosted";
import { FaSignOutAlt } from "react-icons/fa";



const Company = () => {
  const [selectedOption, setSelectedOption] = useState("Profile");

  const options = [
    { name: "Profile", content: <CompanyDetail /> },
    { name: "Dashboard", content: <Dashboard /> },
    { name: "Vacancies Posted", content: <JobPosted /> },
    { name: "Applicants", content: "Applicants list here..." },
  ];

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-gray-300 p-6">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Company Logo"
            className="w-16 h-16 rounded-full border-4 border-gray-700 mb-4"
          />
          <h2 className="text-xl font-semibold text-white">Tech Innovators Inc.</h2>
        </div>

        <ul className="space-y-2">
          {options.map((option) => (
            <li key={option.name}>
              <button
                onClick={() => setSelectedOption(option.name)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedOption === option.name
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                  }`}
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
        {/* Logout Button */}
        <div className="mt-50">
          <button
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {options.find(option => option.name === selectedOption)?.content}
      </div>
    </div>


  );
};

export default Company;

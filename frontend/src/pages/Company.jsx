import React, { useState } from "react";
import CompanyDetail from "../components/CompanyDetail";

// Dummy data for the sidebar
const company = {
  name: "Tech Innovators Inc.",
  profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const Company = () => {
  const [selectedOption, setSelectedOption] = useState("Profile");

  const options = [
    { name: "Profile", content: <CompanyDetail/> },
    { name: "Dashboard", content: "Company Dashboard content here..." },
    { name: "Vacancies Posted", content: "List of Vacancies here..." },
    { name: "Recent Applications", content: "Recent Applications list here..." },
  ];

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex flex-col items-center mb-6">
          <img
            src={company.profilePicture}
            alt="Company Profile"
            className="w-24 h-24 rounded-full border-4 border-white mb-4"
          />
          <h2 className="text-2xl font-semibold">{company.name}</h2>
        </div>
        <ul>
          {options.map((option) => (
            <li
              key={option.name}
              className={`p-3 mb-2 cursor-pointer rounded-md transition-all duration-200 ${
                selectedOption === option.name
                  ? "bg-gray-800 text-white font-semibold shadow-md"
                  : "text-white hover:bg-gray-800"
              }`}
              onClick={() => setSelectedOption(option.name)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Section */}
      <div className="w-3/4 p-6 bg-purple-600 text-white shadow-md overflow-scroll">
        {options.map(
          (option) =>
            selectedOption === option.name && (
              <div key={option.name}>
                
                <p>{option.content}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Company;

import React, { useEffect, useState } from "react";
import CompanyDetail from "../components/CompanyDetail";
import Dashboard from "../components/Dashboard";
import JobPosted from "../components/JobPosted";
import { FaSignOutAlt } from "react-icons/fa";
import CreateVacancy from "../components/CreateVacancy";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/companySlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";




const Company = () => {

  const company = useSelector((state) => state.company.company) || [];
  const [selectedOption, setSelectedOption] = useState("Profile");
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/companyJob/${company._id}`);
        if (response.data) {
          console.log('Fetched Jobs:', response.data);
          setJobs(response.data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);
  const options = [
    { name: "Profile", content: <CompanyDetail companyData={company}/> },
    { name: "Dashboard", content: <Dashboard /> },
    { name: "Vacancies Posted", content: <JobPosted jobs={jobs} /> },
    { name: "Applicants", content: <CreateVacancy company={company}/> },
    { name: "Create Vacancy", content: <CreateVacancy company={company}/> },
  ];
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/companyLogin")
  }

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-gray-300 p-6">
        <div className="flex flex-col items-center mb-8">
          <img
            src={`http://localhost:5000/${company.logo}`}
            alt="Company Logo"
            className="w-16 h-16 rounded-full border-4 border-gray-700 mb-4"
          />
          <h2 className="text-xl font-semibold text-white">T{company.name}</h2>
        </div>

        <ul className="space-y-2">
          {options.map((option) => (
            <li key={option.name}>
              <button
                onClick={() => setSelectedOption(option.name)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedOption === option.name
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700"
                  }`}
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
        {/* Logout Button */}
        <div className="mt-45">
          <button
            onClick={handleLogout}
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

import React, { useEffect, useState } from "react";
import CompanyDetail from "../components/CompanyDetail";
import Dashboard from "../components/Dashboard";
import JobPosted from "../components/JobPosted";
import { FaSignOutAlt } from "react-icons/fa";
import CreateVacancy from "../components/CreateVacancy";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/companySlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApplicationList from "../components/ApplicationList";
import { FaBars } from "react-icons/fa";

const Company = () => {
  const [reload, setReload] = useState(false);
  const company = useSelector((state) => state.company.company) || [];
  const [selectedOption, setSelectedOption] = useState("Profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const [jobs, setJobs] = useState(null);
  const navigate = useNavigate();

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
  }, [reload]);

  const options = [
    { name: "Profile", content: <CompanyDetail companyData={company} /> },
    { name: "Dashboard", content: <Dashboard jobs={jobs} /> },
    { name: "Vacancies Posted", content: <JobPosted jobs={jobs} /> },
    { name: "Applications", content: <ApplicationList company={company} /> },
    { name: "Create Vacancy", content: <CreateVacancy company={company} setReload={setReload} /> },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/companyLogin");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      {/* Mobile Toggle Button */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:hidden p-4 bg-gray-800 text-white shadow-md">

        <h1 className="text-xl font-semibold">Company Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`md:block ${sidebarOpen ? "block" : "hidden"} md:w-64 bg-gray-800 text-gray-300 p-6`}>
        <div className="flex flex-col items-center mb-8">
          <img
            src={`http://localhost:5000/${company.logo}`}
            alt="Company Logo"
            className="w-16 h-16 rounded-full border-4 border-gray-700 mb-4"
          />
          <h2 className="text-xl font-semibold text-white text-center">{company.name}</h2>
        </div>

        <ul className="space-y-2">
          {options.map((option) => (
            <li key={option.name}>
              <button
                onClick={() => {
                  setSelectedOption(option.name);
                  setSidebarOpen(false); // Close on mobile after selection
                }}
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
        <div className="mt-10">
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
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto text-white">
        {options.find(option => option.name === selectedOption)?.content}
      </div>
    </div>
  );
};

export default Company;

import React from "react";
import { FiBriefcase, FiUsers, FiFileText, FiDollarSign, FiClock, FiCheckCircle } from "react-icons/fi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const company = useSelector((state) => state.company.company) || [];
  // Sample data - replace with your actual data
  const stats = {
    vacanciesPosted: 12,
    activeApplications: 47,
    interviewsScheduled: 8,
    hiredThisMonth: 5,
    averageSalary: "$85,000",
    timeToHire: "24 days"
  };

  const recentVacancies = [
    { id: 1, title: "Senior React Developer", applicants: 15, status: "Active" },
    { id: 2, title: "UX Designer", applicants: 8, status: "Active" },
    { id: 3, title: "DevOps Engineer", applicants: 12, status: "Closed" }
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Company Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Vacancies Posted */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Vacancies Posted</p>
              <p className="text-3xl font-bold text-white">{stats.vacanciesPosted}</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-full">
              <FiBriefcase className="text-white text-xl" />
            </div>
          </div>
          
        </div>

        {/* Hired This Month */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Hired This Month</p>
              <p className="text-3xl font-bold text-white">{stats.hiredThisMonth}</p>
            </div>
            <div className="p-3 bg-yellow-600 rounded-full">
              <FiCheckCircle className="text-white text-xl" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <a href="#" className="text-blue-400 hover:underline text-sm">View new hires</a>
          </div>
        </div>

        {/* Average Salary */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Average Salary</p>
              <p className="text-3xl font-bold text-white">{stats.averageSalary}</p>
            </div>
            <div className="p-3 bg-red-600 rounded-full">
              <FiDollarSign className="text-white text-xl" />
            </div>
          </div>
          
        </div>

      </div>

      {/* Latest Vacancy Posted By The Company */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Vacancies</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Position</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Applicants</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {recentVacancies.map((vacancy) => (
                <tr key={vacancy.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-white">{vacancy.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-white">{vacancy.applicants}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      vacancy.status === "Active" 
                        ? "bg-green-900 text-green-300" 
                        : "bg-gray-700 text-gray-300"
                    }`}>
                      {vacancy.status}
                    </span>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
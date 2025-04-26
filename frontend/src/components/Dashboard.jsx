import React from "react";
import { FiBriefcase, FiCheckCircle } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Dashboard = ({ jobs }) => {

  // Sample data - replace with your actual data
  const stats = {
    activeApplications: 47,
    interviewsScheduled: 8,
    hiredThisMonth: 5,
    averageSalary: "$85,000",
    timeToHire: "24 days"
  };

  // Convert date string to Date object and sort in descending order
  const recentVacancies = jobs
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  //Calculate average salary
  var sum = 0;
  jobs.forEach(job => {
    sum += parseInt(job.salary)
  })
  const averageSalary = sum / jobs.length;
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
              <p className="text-3xl font-bold text-white">{jobs.length}</p>
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

        </div>

        {/* Average Salary */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Average Salary</p>
              <p className="text-3xl font-bold text-white">Rs.{parseInt(averageSalary)}</p>
            </div>
            <div className="p-3 bg-red-600 rounded-full">
              <FaRupeeSign className="text-white text-xl" />
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
                
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {recentVacancies.map((vacancy) => (
                <tr key={vacancy.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-white">{vacancy.title}</td>
                  

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
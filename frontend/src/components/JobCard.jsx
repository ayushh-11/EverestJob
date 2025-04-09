import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

function JobCard({ job }) {
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/jobdetail?query=${id}`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-blue-200">
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={job.logo}
            alt={job.company}
            className="w-14 h-14 object-contain rounded-lg border border-gray-200 p-1"
          />
          <div>
            <h2 className="text-xl text-gray-900 mb-1 font-[600]">{job.title}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <FaBuilding className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{job.company}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-6 leading-relaxed">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-2 bg-blue-50 text-blue-800 rounded-full text-sm flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" />
            {job.deadline}
          </span>
          <span className="px-3 py-2 bg-purple-50 text-purple-800 rounded-full text-sm flex items-center gap-2">
            <FaMapMarkerAlt className="text-purple-600" />
            {job.location}
          </span>
          <span className="px-3 py-2 bg-green-50 text-green-800 rounded-full text-sm flex items-center gap-2">
            <FaClock className="text-green-600" />
            {job.type}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <FaMoneyBillWave className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-xs text-gray-500">Salary</p>
              <p className="text-sm font-semibold">${job.salary}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaCalendarAlt className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-xs text-gray-500">Posted</p>
              <p className="text-sm font-semibold">{job.datePosted}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={() => handleDetail(job.id)}
          className="w-full bg-gray-800 text-gray-200 px-6 py-3 rounded-lg font-semibold
             hover:bg-gray-700 hover:text-white cursor-pointer shadow-md transition-all duration-300 transform hover:scale-105"
        >
          View Details
        </button>

      </div>
    </div>
  );
}

export default JobCard;
import React, { useState } from 'react';
import axios from 'axios';

function ApplicationCard({ application }) {
  const { user, vacancy, application: app } = application;
  const postedDate = new Date(vacancy.createdAt).toLocaleDateString();
  const [status, setStatus] = useState(app.status);

  const handleStatusToggle = async () => {
    try {
      const updatedStatus = !status;
      await axios.put(`http://localhost:5000/applicationStatus/${app._id}`, {
        status: updatedStatus,
      });
      setStatus(updatedStatus);
      console.log("Updated")
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition text-gray-200">
      {/* Profile + Name */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        <img
          src={`http://localhost:5000/${user.profile}`}
          alt={user.name}
          className="w-24 h-24 object-cover rounded-full border border-gray-500"
        />
        <h3 className="text-lg font-semibold">{user.name}</h3>
      </div>

      {/* Right Content */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {/* Left Details */}
          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-gray-400">Email:</span> {user.email}</p>
            <p><span className="font-medium text-gray-400">Phone:</span> {user.phone}</p>
            <p><span className="font-medium text-gray-400">Bio:</span> {user.bio}</p>
            <p><span className="font-medium text-gray-400">Skills:</span> {user.skill.join(', ')}</p>
          </div>

          {/* Job Info */}
          <div className="space-y-1 text-sm">
            <p><span className="font-medium text-gray-400">Job Title:</span> {vacancy.title}</p>
            <p><span className="font-medium text-gray-400">Salary:</span> Rs. {vacancy.salary}</p>
            <p><span className="font-medium text-gray-400">Date Posted:</span> {postedDate}</p>
            <p>
              <span className="font-medium text-gray-400">Application Status:</span>{' '}
              <span className={status ? 'text-green-400' : 'text-yellow-400'}>
                {status ? 'Selected' : 'Pending'}
              </span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-4">
          <a
            href={`http://localhost:5000/${app.cv}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            View CV
          </a>
          <button
            onClick={handleStatusToggle}
            className={`px-4 py-2 rounded-md transition ${
              status ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            Mark as {status ? 'Pending' : 'Selected'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;

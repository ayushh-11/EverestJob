import React, { useEffect, useState } from 'react';
import ApplicationCard from './ApplicationCard';
import axios from 'axios';

function ApplicationList({ company }) {
    console.log("Company id =>>>>>>>"+company._id)
    const [applications, setApplications] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:5000/getApplication/${company._id}`)
        .then(response => {
            if(response.data){
                console.log("enriched apllication data = "+response.data)
                setApplications(response.data)
            }
        })
        .catch(error => {
            console.error("Error fetching applications:", error);
            setApplications([]); // Avoid null issues on error
          });
    },[])
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Job Applications</h1>

      {applications?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {applications.map((appData) => (
            <ApplicationCard key={appData.application._id} application={appData} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No applications found.</p>
      )}
    </div>
  );
}

export default ApplicationList;

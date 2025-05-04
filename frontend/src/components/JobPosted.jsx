import React from 'react'
import JobCard from './JobCard';

function JobPosted({ jobs, setReload }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length > 0 ? (
                jobs.map((job, index) => <JobCard key={index} job={job} setReload={setReload} />)
            ) : (
                <p className="text-gray-600">No jobs found.</p>
            )}
        </div>
    )
}

export default JobPosted
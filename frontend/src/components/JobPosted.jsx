import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import JobCard from './JobCard';

function JobPosted() {
    const [jobPosted , setJobPosted] = useState([]);
    const jobs = useSelector((state) => state.job.jobs) || [];
    useEffect(() => {
            const results = jobs.filter(job =>
                job.id == 14 || job.id == 15
            );
            setJobPosted(results);
        }, [ jobs]);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobPosted.length > 0 ? (
                jobPosted.map((job, index) => <JobCard key={index} job={job} />)
            ) : (
                <p className="text-gray-600">No jobs found.</p>
            )}
        </div>
    )
}

export default JobPosted
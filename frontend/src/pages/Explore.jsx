import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserNav from '../components/UserNav';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';

function Explore() {
    const [sortOption, setSortOption] = useState(null);
    const [listingType, setListingType] = useState('job'); // 'job' or 'internship'
    const jobs = useSelector((state) => state.job.jobs) || [];

    // Filter jobs based on listing type (job or internship)
    const filteredJobs = jobs.filter((job) => {
        if (listingType === 'job') {
            return job.type === 'job'; // Assuming each job has a `type` field
        } else if (listingType === 'internship') {
            return job.type === 'internship'; // Assuming each job has a `type` field
        }
        return true;
    });

    // Sort jobs based on the selected sort option
    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortOption === 'date') {
            return new Date(b.datePosted) - new Date(a.datePosted);
        } else if (sortOption === 'salary') {
            return b.salary - a.salary;
        }
        return 0;
    });

    return (
        <>
            <UserNav />
            <div className="w-full max-w-7xl mx-auto mt-12 p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-black">
                        Explore {listingType === 'job' ? 'Jobs' : 'Internships'}
                    </h2>
                    <div className="flex gap-3">
                        {/* Dropdown for Job/Internship Selection */}
                        <select
                            value={listingType}
                            onChange={(e) => setListingType(e.target.value)}
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium 
               border-none shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 
               hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                            <option className='text-black' value="job">Jobs</option>
                            <option className='text-black' value="internship">Internships</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mb-6">
                    {/* Sort by Date */}
                    <button
                        className={`px-4 py-2 rounded-md font-medium text-white transition-all 
               bg-gradient-to-r from-blue-600 to-purple-600 shadow-md
               hover:from-blue-700 hover:to-purple-700`}
                        onClick={() => setSortOption(sortOption === 'date' ? null : 'date')}
                    >
                        Sort by Date
                    </button>

                    {/* Sort by Salary */}
                    <button
                        className={`px-4 py-2 rounded-md font-medium text-white transition-all 
               bg-gradient-to-r from-blue-600 to-purple-600 shadow-md
               hover:from-blue-700 hover:to-purple-700`}
                        onClick={() => setSortOption(sortOption === 'salary' ? null : 'salary')}
                    >
                        Sort by Salary
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedJobs.length > 0 ? (
                        sortedJobs.map((job, index) => <JobCard key={index} job={job} />)
                    ) : (
                        <p className="text-gray-400">No {listingType === 'job' ? 'jobs' : 'internships'} found</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Explore;
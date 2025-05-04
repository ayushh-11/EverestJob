import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserNav from '../components/UserNav';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    const query = useQuery().get("query");
    const [sortOption, setSortOption] = useState(null);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const jobs = useSelector((state) => state.job.jobs);

    useEffect(() => {
        const results = jobs.filter(job =>
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.companyName.toLowerCase().includes(query.toLowerCase()) ||
            job.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredJobs(results);
    }, [query, jobs]);

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortOption === 'date') {
            return new Date(b.datePosted) - new Date(a.datePosted);
        } else if (sortOption === 'salary') {
            return b.salary - a.salary;
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <UserNav />
            <div className="container mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Results for "
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {query}
                        </span>
                        "
                    </h2>
                    <p className="text-lg text-gray-600">
                        {sortedJobs.length} job{sortedJobs.length !== 1 && 's'} found
                    </p>
                </div>

                {/* Sorting Controls */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
                    <button
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ease-out 
        ${sortOption === 'date'
                                ? 'bg-indigo-700 text-white shadow-lg hover:shadow-indigo-400/20'
                                : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-indigo-500'}
        hover:scale-105 active:scale-95`}
                        onClick={() => setSortOption(sortOption === 'date' ? null : 'date')}
                    >
                        🗓 {sortOption === 'date' ? 'Newest First' : 'Sort by Date'}
                    </button>
                    <button
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ease-out 
        ${sortOption === 'salary'
                                ? 'bg-emerald-700 text-white shadow-lg hover:shadow-emerald-400/20'
                                : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-emerald-500'}
        hover:scale-105 active:scale-95`}
                        onClick={() => setSortOption(sortOption === 'salary' ? null : 'salary')}
                    >
                        💰 {sortOption === 'salary' ? 'Highest Salary' : 'Sort by Salary'}
                    </button>
                </div>

                {/* Job Listings */}
                {sortedJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedJobs.map((job, index) => (
                            <JobCard
                                key={index}
                                job={job}
                                className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
                        <div className="max-w-md mx-auto">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                No jobs found for "{query}"
                            </h3>
                            <p className="text-gray-600">
                                Try adjusting your search terms or check back later!
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SearchPage;
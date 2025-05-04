import React from 'react'
import JobCard from '../components/JobCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

function Admin() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const[reload, setReload] = useState(false);

    const fetchJobs = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await axios.get('http://localhost:5000/index');
            if (response.data) {
                setJobs(response.data)
            }
        } catch (error) {
            console.error('Error fetching jobs:', error)
            setError('Failed to load jobs. Please try again later.')
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchJobs()
    }, [reload])

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button 
                        onClick={fetchJobs}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Refresh Jobs
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <BeatLoader color="#3B82F6" />
                        <p className="mt-4 text-gray-600">Loading job listings...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-4 rounded-md">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={fetchJobs}
                            className="mt-2 text-red-600 hover:text-red-700 font-medium"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Current Job Postings ({jobs.length})
                            </h2>
                            <span className="text-sm text-gray-500">
                                Last updated: {new Date().toLocaleDateString()}
                            </span>
                        </div>

                        {jobs.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {jobs.map((job, index) => (
                                    <JobCard 
                                        key={index} 
                                        job={job} 
                                        isAdmin={true}
                                        setReload={setReload}
                                        onDelete={() => {/* Add delete functionality */}}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow">
                                <p className="text-gray-600 text-lg">No active job postings found.</p>
                                <p className="text-gray-500 mt-2">
                                    Click the "Create New Job" button to add a new posting.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin
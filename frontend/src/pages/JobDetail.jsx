import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserNav from '../components/UserNav';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function JobDetail() {
    
    const jobs = useSelector((state) => state.job.jobs) || [];
    const query = useQuery().get("query");
    console.log(query)
    const job = jobs.find(element => element.id == query);

    const [cvFile, setCvFile] = useState(null);

    const handleFileChange = (e) => {
        setCvFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle CV submission here
        console.log('CV File:', cvFile);
    };

    return (
        <div className="min-h-screen bg-white">
            <UserNav />
            <div className="container mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:px-8">
                {/* Job Header */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={job.logo}
                                alt={job.company}
                                className="w-16 h-16 object-contain rounded-lg border border-gray-300"
                            />
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-semibold text-gray-700">{job.company}</span>
                                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                                        {job.category}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                                        📍 {job.location}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                                        🏢 {job.type}
                                    </span>
                                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                                        💰 ${job.salary.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">📅 Posted:</span>
                            <span>{job.datePosted}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">⏳ Deadline:</span>
                            <span className="text-red-600">{job.deadline}</span>
                        </div>
                    </div>
                </div>

                {/* Upload CV Section */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your CV</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Upload CV (PDF/DOCX) *</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg cursor-pointer">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg 
                                                className="w-8 h-8 text-gray-400 mb-2" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                                                />
                                            </svg>
                                            <p className="text-sm text-gray-500">
                                                {cvFile ? 
                                                    cvFile.name : 
                                                    'Click to upload or drag and drop'
                                                }
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Supported formats: .pdf, .doc, .docx
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            required
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                            >
                                Submit CV
                            </button>
                        </div>
                    </form>
                </div>

                {/* Company Details */}
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">About {job.company}</h2>
                    <div className="flex gap-6">
                        <img
                            src={job.logo}
                            alt={job.company}
                            className="w-32 h-32 object-contain rounded-lg border border-gray-300"
                        />
                        <div className="flex-1">
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {job.company} is a leading organization in the content creation and digital marketing industry, 
                                specializing in innovative solutions and technologies.
                            </p>
                            <div className="space-y-3 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">📧</span>
                                    <span>info@{job.company.toLowerCase().replace(/\s+/g, '')}.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">🌐</span>
                                    <span>www.{job.company.toLowerCase().replace(/\s+/g, '')}.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default JobDetail;

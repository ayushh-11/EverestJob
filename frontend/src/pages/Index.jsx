import React, { useState, useEffect, useMemo } from "react";
import axios from "axios"
import UserNav from "../components/UserNav";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Search } from "js-search"; // Use ExactWordIndex for better matching

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/index")
      .then(response => {
        if (response.data) {
          setUserData(response.data);
        }
      })
  }, [])

  // Fetching jobs from Redux store
  const jobs = useSelector((state) => state.job.jobs) || [];
  const userSkills = userData?.skill; // Example user skills
  

  // Memoized Search Engine
  const searchEngine = useMemo(() => {
    const search = new Search("title");
    search.addIndex("title");
    search.addIndex("description");
    search.addIndex("category");
    search.addDocuments(jobs);
    return search;
  }, [jobs]);

  // Function to get recommended jobs based on user skills
  const getRecommendations = useMemo(() => {
    if (!userSkills || userSkills.length === 0) return jobs;

    const results = userSkills
      .map((skill) => searchEngine.search(skill))
      .flat()
      .filter((job, index, self) => self.findIndex((j) => j.title === job.title) === index);

    return results.length > 0 ? results : jobs;
  }, [searchEngine, userSkills, jobs]);

  // Effect to update recommended jobs once
  useEffect(() => {
    setRecommendedJobs(getRecommendations);
  }, [getRecommendations]);



  // Function to handle search query
  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div>
      {/* Navbar */}
      <UserNav/>

      {/* Search Area */}
      <div className="w-full flex flex-col items-center text-center py-20 bg-gray-900 shadow-xl">
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-white mb-8 font-semibold tracking-tight">
            Discover Your Next Career Adventure
          </h2>
          <div className="relative w-full mx-auto group">
            <div className="flex items-center bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 px-2 py-1">
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                className="flex-grow px-6 py-5 bg-transparent text-white outline-none placeholder-gray-500 text-lg border-0 focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search for jobs"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                className="ml-2 px-8 py-4 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center"
                onClick={handleSearch}
              >
                <FaSearch className="text-white text-xl mr-2" />
                <span className="text-white font-semibold hidden sm:inline">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Recommendations */}
      <div className="w-full max-w-7xl mx-auto mt-12 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Recommended Jobs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedJobs.length > 0 ? (
            recommendedJobs.map((job, index) => <JobCard key={index} job={job} />)
          ) : (
            <p className="text-gray-600">No jobs found. Try a different search.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Index;

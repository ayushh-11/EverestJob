import React, { useState, useEffect, useMemo } from "react";
import UserNav from "../components/UserNav";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const navigate = useNavigate();

  const jobs = useSelector((state) => state.job.jobs) || [];
  const userData = useSelector((state) => state.user.user) || {};
  const userSkills = userData?.skill || [];

  // Utility: Tokenize text
  const tokenize = (text) => {
    return text.toLowerCase().split(/\W+/).filter(Boolean);
  };

  // Utility: Build TF map for document
  const getTF = (tokens) => {
    const tf = {};
    tokens.forEach((word) => {
      tf[word] = (tf[word] || 0) + 1;
    });
    const total = tokens.length;
    for (let word in tf) {
      tf[word] = tf[word] / total;
    }
    return tf;
  };

  // Memo: TF-IDF model for all jobs
  const jobTFIDFData = useMemo(() => {
    const docCount = jobs.length;
    const idf = {};
    const docTFs = [];

    // Count DF for IDF
    jobs.forEach((job) => {
      const text = `${job.title} ${job.description}`;
      const tokens = [...new Set(tokenize(text))];
      tokens.forEach((word) => {
        idf[word] = (idf[word] || 0) + 1;
      });
    });

    // Final IDF values
    for (let word in idf) {
      idf[word] = Math.log(docCount / (1 + idf[word]));
    }

    // TF for each document
    jobs.forEach((job) => {
      const text = `${job.title} ${job.description}`;
      const tokens = tokenize(text);
      const tf = getTF(tokens);
      docTFs.push(tf);
    });

    return { tf: docTFs, idf };
  }, [jobs]);

  const cosineSimilarity = (vecA, vecB) => {
    const allWords = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
    let dot = 0;
    let magA = 0;
    let magB = 0;

    allWords.forEach((word) => {
      const a = vecA[word] || 0;
      const b = vecB[word] || 0;
      dot += a * b;
      magA += a * a;
      magB += b * b;
    });

    return dot / (Math.sqrt(magA) * Math.sqrt(magB) || 1);
  };

  // Memo: Recommended Jobs using TF-IDF
  const getRecommendations = useMemo(() => {
    if (!userSkills || userSkills.length === 0) return jobs.slice(0, 6);

    const skillTokens = tokenize(userSkills.join(" "));
    const skillTF = getTF(skillTokens);

    const recommendations = jobs.map((job, i) => {
      const tfidfVec = {};
      const tf = jobTFIDFData.tf[i];

      Object.keys(tf).forEach((word) => {
        tfidfVec[word] = tf[word] * (jobTFIDFData.idf[word] || 0);
      });

      const skillVec = {};
      Object.keys(skillTF).forEach((word) => {
        skillVec[word] = skillTF[word] * (jobTFIDFData.idf[word] || 0);
      });

      const score = cosineSimilarity(skillVec, tfidfVec);
      return { ...job, score };
    });

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [jobs, userSkills, jobTFIDFData]);

  useEffect(() => {
    setRecommendedJobs(getRecommendations);
  }, [getRecommendations]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      toast.error("Enter keyword to search", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div>
      <UserNav />

      {/* Search Section */}
      <div className="w-full flex flex-col items-center text-center py-20 bg-gray-900 shadow-xl">
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-white mb-8 font-semibold tracking-tight">
            Discover Your Next Career Adventure
          </h2>
          <div className="relative w-full mx-auto group">
            <div className="flex items-center bg-gray-800 rounded-2xl shadow-lg px-2 py-1">
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                className="required flex-grow px-6 py-5 bg-transparent text-white outline-none placeholder-gray-500 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search for jobs"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                className="ml-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:scale-105 flex items-center justify-center"
                onClick={handleSearch}
              >
                <FaSearch className="text-white text-xl mr-2" />
                <span className="text-white font-semibold hidden sm:inline">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="w-full max-w-7xl mx-auto mt-12 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommended Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedJobs.length > 0 ? (
            recommendedJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          ) : (
            <p className="text-gray-600">No jobs found. Try a different search.</p>
          )}
        </div>
      </div>

      {/* Trending Fallback */}
      {recommendedJobs.length === 0 && (
        <div className="w-full max-w-7xl mx-auto mt-7 p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.slice(0, 6).map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Index;

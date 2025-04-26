import React, { useState, useEffect } from 'react';
import UserNav from '../components/UserNav';
import Cats from '../components/Cats';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import { useSelector } from 'react-redux';

function Category() {
  const [cat, setCat] = useState("");
  const jobs = useSelector((state) => state.job.jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const trimmedCat = cat.trim().toLowerCase();
    const results = trimmedCat
      ? jobs.filter((job) =>
          job.category?.toLowerCase().includes(trimmedCat)
        )
      : [];
    setFilteredJobs(results);
  }, [cat, jobs]);

  return (
    <div>
      <UserNav />
      {!cat ? (
        <Cats setCat={setCat} />
      ) : (
        <div className='mt-10 mb-10 w-full px-20'>
          <button 
            className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-all shadow-lg flex items-center gap-2" 
            onClick={() => setCat("")}
          >
            <span className="text-xl">←</span> Back to Categories
          </button>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredJobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-6 text-lg">No vacancy for the category</p>
          )}
        </div>
      )}

      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Category;

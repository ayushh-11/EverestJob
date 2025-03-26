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
    const results = jobs.filter(job =>
      job.category.toLowerCase().includes(cat.toLowerCase())
    );
    setFilteredJobs(results);
  }, [cat, jobs]); // Runs when `cat` or `jobs` changes

  return (
    <div>
      <UserNav />
      {!cat ?
        <Cats setCat={setCat} />
        :
        <div className='mt-10 mb-10 w-full px-20'>
          <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 cursor-pointer" onClick={()=>setCat("")}>Back</button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      }

      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Category;

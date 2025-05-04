import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import Cats from '../components/Cats';
import { useDispatch } from 'react-redux';
import { addJob } from '../redux/jobSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([])


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/index');
        if (response.data) {
          console.log('Fetched Jobs:', response.data);
          dispatch(addJob(response.data));
          setJobs(response.data.slice(0,6));
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);
  
  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Find Perfect Jobs <br /> From Your Home
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover the best job opportunities tailored for you. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#catalogue"
                className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                EXPLORE NOW
              </a>
              <Link
                to="/companyRegister"
                className="bg-gray-700 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
              >
                Company Login
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="/bg.jpg"
              alt="Hero"
              className="rounded-lg shadow-xl max-w-full h-120"
            />
          </div>
        </div>
      </div>

      {/* Category Section */}
      <section id="catalogue" className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Cats />
        </div>
      </section>

      {/* Job Cards Section */}
      <section id="explore" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Jobs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
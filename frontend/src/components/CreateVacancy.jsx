import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const CreateVacancy = ({ company, setReload }) => {

  const [formData, setFormData] = useState({
    title: '',
    salary: '',
    type: 'job',
    expiry: new Date(),
    description: '',
    location: '',
    postedBy: company._id,
    companyLogo: company.logo,
    companyName : company.name
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/createVacancy", formData)
      .then(response => {
        if (response.data == "success") {
          toast.success("Vacancy Created", {
            position: "top-center"
          });

          setFormData({
            title : '',
            salary : '',
            type : 'job',
            expiry : new Date(),
            description : '',
            location : '',
            category : '',
            postedBy : company._id,
            companyLogo : company.logo,
            companyName : company.name
          });
          setReload(prev => !prev);
        }
        else {
          toast.error("Failed to create vacancy", {
            position: "top-center"
          });
          setFormData({
            title: '',
            salary: '',
            type: 'job',
            expiry: new Date(),
            description: '',
            location: '',
            category : '',
            postedBy: company._id,
            companyLogo: company.logo,
            companyName : company.name
          });
        }
      })

  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto rounded-xl shadow-xl p-8 border border-gray-700 bg-gray-800">
        <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
          Create New Vacancy
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-3">Job Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-200 text-black placeholder-gray-600 focus:bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Senior Software Engineer"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-3">Location</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-200 text-black placeholder-gray-600 focus:bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., New York, Remote"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-3">Salary Range</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-200 text-black placeholder-gray-600 focus:bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              placeholder="e.g., $80,000 - $120,000"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-3">Position Type</label>
            <select
              className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-200 text-black focus:bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option className="p-5" value="job">Full-time Position</option>
              <option value="internship">Internship Program</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-3">Job Description</label>
            <textarea
              rows={5}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-200 text-black placeholder-gray-600 focus:bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed job description, requirements, and benefits..."
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-3">Job Category</label>
            <select
              className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-200 text-black focus:bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="accountant">Accountant</option>
              <option value="teaching">Teaching</option>
              <option value="plumbing">Plumbing</option>
              <option value="driving">Driving</option>
              <option value="coding">Coding</option>
              <option value="other">Other</option>
            </select>
          </div>


          <div>
            <label className="block text-white text-sm font-medium mb-3">Application Deadline</label>
            <DatePicker
              selected={formData.expiry}
              onChange={(date) => setFormData({ ...formData, expiry: date })}
              minDate={new Date()}
              className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-gray-200 text-black focus:bg-white focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              popperClassName="shadow-xl rounded-lg"
            />
          </div>

          <button
            type="submit"

            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 
                 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >

            Publish Vacancy

          </button>
        </form>
      </div>
      <ToastContainer />
    </div>

  );
};

export default CreateVacancy;
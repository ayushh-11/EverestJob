import React, { useEffect, useState } from "react";
import { FiEdit2, FiUpload, FiPlus, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setCompany } from "../redux/companySlice";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyDetail = ({companyData}) => {
  const dispatch = useDispatch();
  
  
  const [company, setCompanyData] = useState(companyData);
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState(""); // handle separately

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setCompanyData((prev) => ({
        ...prev,
        profile: files[0], // store file
      }));
    } else {
      setCompanyData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSpecialtyChange = (index, value) => {
    const newSpecialities = [...company.specialities];
    newSpecialities[index] = value;
    setCompanyData({ ...company, specialities: newSpecialities });
  };

  const addSpecialty = () => {
    setCompanyData({ ...company, specialities: [...company.specialities, ""] });
  };

  const removeSpecialty = (index) => {
    const newSpecialities = company.specialities.filter((_, i) => i !== index);
    setCompanyData({ ...company, specialities: newSpecialities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", company.name);
    data.append("email", company.email);
    data.append("phone", company.phone);
    data.append("description", company.description);
    
    if (password.length > 0) {
      data.append("password", password); // only send new password
      if (password.length < 6) {
        toast.error("Password must be greater or equal to 6 digit.", {
          position: "top-center"
        });
        return;
      }
    }

    company.specialities.forEach((s) => data.append("specialities", s));
    if (company.logo instanceof File) {
      data.append("logo", company.logo);
    }
    await axios.put(`http://localhost:5000/updateCompany/${company._id}`, data)
      .then(response => {
        if(response.data == "exist"){
          toast.error("Email Exist", {
            position: "top-center"
          });
          return;
        }
        if (response.data != "error") {
          console.log(response.data)
          setEditing(false);
          dispatch(setCompany(response.data))
          toast.success("Data updated.", {
            position: "top-center"
          });
          
        }
      })
  };

  return (
    <div className="p-6 h-150 rounded-lg bg-gray-800 text-gray-100 shadow-lg overflow-scroll">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Company Profile</h2>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <FiEdit2 /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="md:w-1/3 space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={`http://localhost:5000/${company.logo}`}
                alt="Company Logo"
                className="w-32 h-32 rounded-full border-4 border-gray-700 object-cover"
              />
              {editing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                  <FiUpload />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              )}
            </div>
            {editing ? (
              <input
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                className="text-center text-xl font-semibold bg-gray-700 rounded p-2 w-full"
              />
            ) : (
              <h3 className="text-xl font-semibold">{company.name}</h3>
            )}

          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={company.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                />
              ) : (
                <p>{company.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={company.phone}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                />
              ) : (
                <p>{company.phone}</p>
              )}
            </div>
            <div>

              {editing ? (
                <>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                  <input
                    type="password"
                    name="phone"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-2/3 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            {editing ? (
              <textarea
                name="description"
                value={company.description}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
                rows="4"
              />
            ) : (
              <p className="text-gray-300">{company.description}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-400">specialities</label>
              {editing && (
                <button
                  onClick={addSpecialty}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                >
                  <FiPlus size={14} /> Add
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {company.specialities.map((specialty, index) => (
                <div key={index} className="flex items-center gap-1">
                  {editing ? (
                    <>
                      <input
                        type="text"
                        value={specialty}
                        onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                        className="p-2 bg-gray-700 rounded border border-gray-600"
                      />
                      <button
                        onClick={() => removeSpecialty(index)}
                        className="p-1 text-red-500 hover:text-red-400 rounded-full"
                      >
                        <FiX />
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1 bg-gray-700 rounded-full">
                      {specialty}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default CompanyDetail;

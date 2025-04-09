import React, { useState } from "react";
import { FiEdit2, FiUpload, FiPlus, FiX } from "react-icons/fi";

const CompanyDetail = () => {
  const [company, setCompany] = useState({
    name: "Tech Innovators Inc.",
    industry: "Information Technology",
    description: "Building cutting-edge solutions for tomorrow's problems",
    email: "contact@techinnovators.com",
    phone: "+1 (555) 123-4567",
    website: "www.techinnovators.com",
    logo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialties: ["AI/ML", "Cloud Computing", "Cybersecurity"]
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSpecialtyChange = (index, value) => {
    const newSpecialties = [...company.specialties];
    newSpecialties[index] = value;
    setCompany({ ...company, specialties: newSpecialties });
  };

  const addSpecialty = () => {
    setCompany({ ...company, specialties: [...company.specialties, ""] });
  };

  const removeSpecialty = (index) => {
    const newSpecialties = company.specialties.filter((_, i) => i !== index);
    setCompany({ ...company, specialties: newSpecialties });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompany({ ...company, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div className="p-6 h-150 rounded-lg bg-gray-800 text-gray-100 shadow-lg">
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
                src={company.logo}
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
                    onChange={handleLogoUpload}
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
            {editing ? (
              <input
                type="text"
                name="industry"
                value={company.industry}
                onChange={handleChange}
                className="text-center text-gray-400 bg-gray-700 rounded p-2 w-full"
              />
            ) : (
              <p className="text-gray-400">{company.industry}</p>
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
                  type="tel"
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
              <label className="block text-sm font-medium text-gray-400 mb-1">Website</label>
              {editing ? (
                <input
                  type="text"
                  name="website"
                  value={company.website}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                />
              ) : (
                <p className="text-blue-400 hover:underline">
                  <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                </p>
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
              <label className="block text-sm font-medium text-gray-400">Specialties</label>
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
              {company.specialties.map((specialty, index) => (
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
    </div>
  );
};
export default CompanyDetail;

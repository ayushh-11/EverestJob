import {
  FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaClock,
  FaMoneyBillWave, FaCheckCircle, FaTimesCircle
} from "react-icons/fa";

const UserApplicationCard = ({ application }) => {
  const app = application.application;
  const job = application.vacancy;

  const appliedDate = new Date(app.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const jobExpiry = new Date(job.expiry);
  const postedDate = new Date(job.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const status = app.status === true ? "Congratulations, you are selected. Our team will reach you soon." : app.status === false ? "pending" : app.status;

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full border border-gray-400 transition-all duration-300 hover:shadow-lg hover:border-blue-200">
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`http://localhost:5000/${job.companyLogo}`}
            alt={job.companyName}
            className="w-14 h-14 rounded-lg p-1 object-cover"
          />
          <div>
            <h2 className="text-xl text-gray-900 mb-1 font-semibold">{job.title}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <FaBuilding className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{job.companyName}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-6 leading-relaxed">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-2 bg-blue-50 text-blue-800 rounded-full text-sm flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" />
            {jobExpiry < new Date() ? "Expired" : jobExpiry.toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </span>
          <span className="px-3 py-2 bg-purple-50 text-purple-800 rounded-full text-sm flex items-center gap-2">
            <FaMapMarkerAlt className="text-purple-600" />
            {job.location}
          </span>
          <span className="px-3 py-2 bg-green-50 text-green-800 rounded-full text-sm flex items-center gap-2">
            <FaClock className="text-green-600" />
            {job.type === "job" ? "Job" : "Internship"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <FaMoneyBillWave className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-xs text-gray-500">Salary</p>
              <p className="text-sm font-semibold">Rs.{job.salary}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaCalendarAlt className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-xs text-gray-500">Posted</p>
              <p className="text-sm font-semibold">{postedDate}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mt-auto">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              <span>Applied: {appliedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              {status === "selected" ? (
                <FaCheckCircle className="text-green-600" />
              ) : status === "rejected" ? (
                <FaTimesCircle className="text-red-600" />
              ) : (
                <FaClock className="text-yellow-500" />
              )}
              <span className={`font-medium ${status === 'selected' ? 'text-green-700' : status === 'rejected' ? 'text-red-700' : 'text-green-700'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserApplicationCard;

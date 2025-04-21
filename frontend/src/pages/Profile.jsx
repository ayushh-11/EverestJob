import React, { useState } from "react";
import UserNav from "../components/UserNav";
import Footer from "../components/Footer";
import UserDetails from "../components/UserDetail";
import Message from "../components/Message";
import { useSelector } from "react-redux";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("Profile Details");
  const userData = useSelector(state => state.user.user);
  const options = [
    { name: "Profile Details", content: <UserDetails userData={userData}/> },
    { name: "Vacancies Applied", content: "List of applied vacancies." },
    { name: "Conversation", content: <Message /> },
  ];

  return (
    <>
      <UserNav />

      <div className="h-155 flex flex-col items-center bg-gray-100 text-black p-6">
        <div className="w-full max-w-6xl flex-grow rounded-lg shadow-xl flex flex-col sm:flex-row min-h-[80vh] bg-white overflow-hidden">
          {/* Sidebar */}
          <div className="w-full sm:w-1/3 p-5 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <ul>
              {options.map((option) => (
                <li
                  key={option.name}
                  className={`p-3 mt-2 cursor-pointer rounded-md transition-all duration-200 ${
                    selectedOption === option.name
                      ? "bg-white text-gray-900 font-semibold shadow-md"
                      : "text-white hover:bg-white hover:text-gray-900"
                  }`}
                  onClick={() => setSelectedOption(option.name)}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical Separation Line */}
          <div className="hidden sm:block w-px bg-gray-300"></div>

          {/* Content Section */}
          <div className="w-full sm:w-2/3 bg-white text-gray-900 overflow-y-auto h-[80vh] p-6">
            {options.map(
              (option) =>
                selectedOption === option.name && (
                  <div key={option.name}>
                    <div>{option.content}</div>
                    <div className="mt-6">{/* Future components */}</div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;

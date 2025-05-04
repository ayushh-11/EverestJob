import React, { useEffect, useState } from 'react'
import UserApplicationCard from "../components/UserApplicationCard"
import { useSelector } from "react-redux";
import axios from "axios";

function UserApplication() {
  const userData = useSelector((state) => state.user.user) || [];
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    const fetchApplication = async () => {
      try{
        const response = await axios.get(`http://localhost:5000/getUserApplication/${userData._id}`)
        console.log("Response applications = " + response.data)
        setApplications(response.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchApplication();
  }, [])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8">
      {applications.map((app, index) => (
        <UserApplicationCard key={index} application={app} />
      ))}
    </div>
  )
}

export default UserApplication
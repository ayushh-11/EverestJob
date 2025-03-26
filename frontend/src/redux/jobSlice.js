import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [
    {
      id: 1,
      logo: "/logo.png",
      title: "Content Writer Traineeship & Internship",
      company: "Patan BCA",
      description: "Nepaya Solutions is looking for a passionate and...",
      deadline: "12 days left",
      location: "Kathmandu",
      type: "internship",
      salary: 25000,
      datePosted: "2025-03-01",
      category: "coding"
    },
    {
      id: 2,
      logo: "/logo.png",
      title: "Content Writer",
      company: "Acer",
      description: "We are looking for a creative and tech-savvy...",
      deadline: "Expired",
      location: "Kathmandu",
      type: "job",
      salary: 30000,
      datePosted: "2025-02-25",
      category: "coding"
    },
    {
      id: 3,
      logo: "/logo.png",
      title: "Frontdesk/Receptionist",
      company: "Lenovo",
      description: "We are hiring a CSR Intern for our client in the...",
      deadline: "Expired",
      location: "Kathmandu",
      type: "job",
      salary: 20000,
      datePosted: "2025-02-28",
      category: "accountant"
    },
    {
      id: 4,
      logo: "/logo.png",
      title: "React Intern",
      company: "Lenovo",
      description: "We are hiring a React Intern for our client in the...",
      deadline: "Expired",
      location: "Kathmandu",
      type: "internship",
      salary: 15000,
      datePosted: "2025-02-27",
      category: "coding"
    },
    {
      id: 5,
      logo: "/logo.png",
      title: "React Developer",
      company: "Google",
      description: "We are hiring a React Developer for our client in the...",
      deadline: "Expired",
      location: "Kathmandu",
      type: "job",
      salary: 80000,
      datePosted: "2025-02-20",
      category: "coding"
    },
    {
      id: 6,
      logo: "/logo.png",
      title: "DevOps Engineer",
      company: "Lenovo",
      description: "We are hiring a DevOps Engineer for our client in the...",
      deadline: "5 days Left",
      location: "Kathmandu",
      type: "job",
      salary: 90000,
      datePosted: "2025-03-05",
      category: "coding"
    },
    {
      id: 7,
      logo: "/logo.png",
      title: "Plumbing Technician",
      company: "PlumbCare Solutions",
      description: "We are looking for an experienced plumber...",
      deadline: "10 days left",
      location: "Lalitpur",
      type: "job",
      salary: 35000,
      datePosted: "2025-03-06",
      category: "plumbing"
    },
    {
      id: 8,
      logo: "/logo.png",
      title: "Math Teacher",
      company: "Bright Future Academy",
      description: "We are hiring a qualified Math teacher...",
      deadline: "15 days left",
      location: "Bhaktapur",
      type: "job",
      salary: 40000,
      datePosted: "2025-03-03",
      category: "teaching"
    },
    {
      id: 9,
      logo: "/logo.png",
      title: "Delivery Driver",
      company: "FastTrack Logistics",
      description: "Join our team as a delivery driver...",
      deadline: "7 days left",
      location: "Kathmandu",
      type: "job",
      salary: 28000,
      datePosted: "2025-03-04",
      category: "driving"
    },
    {
      id: 10,
      logo: "/logo.png",
      title: "Chartered Accountant",
      company: "FinanceHub",
      description: "We are hiring a Chartered Accountant...",
      deadline: "20 days left",
      location: "Kathmandu",
      type: "job",
      salary: 100000,
      datePosted: "2025-03-02",
      category: "accountant"
    },
    {
      id: 11,
      logo: "/logo.png",
      title: "Junior Backend Developer Internship",
      company: "TechCorp",
      description: "Join our team as a Junior Backend Developer Intern...",
      deadline: "14 days left",
      location: "Kathmandu",
      type: "internship",
      salary: 20000,
      datePosted: "2025-03-10",
      category: "coding"
    },
    {
      id: 12,
      logo: "/logo.png",
      title: "Senior Plumbing Technician",
      company: "PlumbCare Solutions",
      description: "We are looking for a senior plumbing technician with experience...",
      deadline: "25 days left",
      location: "Lalitpur",
      type: "job",
      salary: 50000,
      datePosted: "2025-03-05",
      category: "plumbing"
    },
    {
      id: 13,
      logo: "/logo.png",
      title: "Teaching Assistant",
      company: "Bright Future Academy",
      description: "We are hiring a Teaching Assistant for the upcoming semester...",
      deadline: "10 days left",
      location: "Bhaktapur",
      type: "internship",
      salary: 15000,
      datePosted: "2025-03-07",
      category: "teaching"
    },
    {
      id: 14,
      logo: "/logo.png",
      title: "Truck Driver",
      company: "Speedy Logistics",
      description: "We are looking for an experienced truck driver...",
      deadline: "13 days left",
      location: "Kathmandu",
      type: "job",
      salary: 35000,
      datePosted: "2025-03-08",
      category: "driving"
    },
    {
      id: 15,
      logo: "/logo.png",
      title: "Accountant Intern",
      company: "FinConnect",
      description: "We are hiring an intern for our accounting team...",
      deadline: "5 days left",
      location: "Kathmandu",
      type: "internship",
      salary: 15000,
      datePosted: "2025-03-10",
      category: "accountant"
    }
  ]
  
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
  },
});

export const { addJob } = jobSlice.actions;
export default jobSlice.reducer;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Explore from "./pages/Explore";
import JobDetail from "./pages/JobDetail";
import Company from "./pages/Company";
import CompanyRegister from "./pages/CompanyRegister";
import CompanyLogin from "./pages/CompanyLogin";

function App() {
  
  return (
     <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/index" element={<Index />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
        <Route path="/jobDetail" element={<JobDetail />}></Route>
        <Route path="/company" element={<Company />}></Route>
        <Route path="/companyRegister" element={<CompanyRegister />}></Route>
        <Route path="/companyLogin" element={<CompanyLogin />}></Route>
      </Routes>
     </BrowserRouter>
  
     </>
  )
}

export default App

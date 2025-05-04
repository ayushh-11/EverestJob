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
import Admin from "./pages/Admin";
import { useSelector } from "react-redux";

function App() {
  const userAuth = useSelector((state) => state.user.auth) || "";
  const companyAuth = useSelector((state) => state.company.auth) || "";
  return (
     <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={userAuth == "user" ? <Index /> : <Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/index"  element={userAuth == "user" ? <Index /> : <Login />}> </Route>
        <Route path="/search"  element={userAuth == "user" ? <SearchPage /> : <Login />}></Route>
        <Route path="/profile"  element={userAuth == "user" ? <Profile /> : <Login />}></Route>
        <Route path="/category"  element={userAuth == "user" ? <Category /> : <Login />}></Route>
        <Route path="/explore"  element={userAuth == "user" ? <Explore /> : <Login />}></Route>
        <Route path="/jobDetail" element={<JobDetail />}></Route>
        <Route path="/company" element={companyAuth == "company" ? <Company /> : <CompanyLogin />}></Route>
        <Route path="/companyRegister" element={<CompanyRegister />}></Route>
        <Route path="/companyLogin" element={companyAuth == "company" ?<Company/>: <CompanyLogin />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
     </BrowserRouter>
  
     </>
  )
}

export default App

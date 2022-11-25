import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ComProfile from "./components/company/company_profile";
import Homepage from "./components/homepage";
import Navbar from "./components/navbar.js";
import Signup from "./components/Signup";
import Signin from "./components/singin";
import {
  DetailPage,
  ExplorePage,
  LandingPage,
  ProfilePage,
  UserProfilePage,
  WelcomePage,
} from "./pages";
import CompanyDetails from './components/Admin/company_details';
import Categories from './components/Admin/categories';
import Home from './components/Admin/pages/Home';
import Profile from './components/Admin/pages/Profile';
import Main from "./components/Admin/components/layout/Main";
import "antd/dist/antd.min.css";
// import "antd/dist/antd.css";
import "./components/Admin/assets/styles/main.css";
import "./components/Admin/assets/styles/responsive.css";
import CompanyAdmin from "./components/Admin/pages/company";
import InvestorAdmin from "./components/Admin/pages/investor";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/welcome" element={<WelcomePage />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route path="/profile" element={<UserProfilePage />}></Route>
        <Route path="/profile/:id" element={<ProfilePage />}></Route>
        <Route path="/company" element={<ComProfile />}></Route>
        <Route path="/explore" element={<ExplorePage />}></Route>
        <Route path="/detail" element={<DetailPage />}></Route>
        <Route path="/comdetails" element={<CompanyDetails />}></Route>
        <Route path="/category" element={<Categories />}></Route>

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<Main />}>
          <Route path="" element={<Home />} />

          {/* There is no need of tables for now */}
          {/* <Route path="/dashboard/tables" element={<Tables />} /> */}
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/company_admin" element={<CompanyAdmin />} />
          <Route path="/dashboard/investor_admin" element={<InvestorAdmin />} />

          {/* Add others routes of dashboard below */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

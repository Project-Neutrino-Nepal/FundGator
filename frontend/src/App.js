import "antd/dist/antd.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Categories from './components/admin/categories';
import CompanyDetails from './components/admin/company_details';
import Main from "./components/admin/components/layout/Main";
import Home from './components/admin/pages/Home';
import Profile from './components/admin/pages/Profile';
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
  WelcomePage
} from "./pages";
// import "antd/dist/antd.css";
import "./components/admin/assets/styles/main.css";
import "./components/admin/assets/styles/responsive.css";
import CompanyAdmin from "./components/admin/pages/company";
import InvestorAdmin from "./components/admin/pages/investor";

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

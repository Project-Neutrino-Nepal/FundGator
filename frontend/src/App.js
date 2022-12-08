import "antd/dist/antd.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./components/admin/assets/styles/main.css";
import "./components/admin/assets/styles/responsive.css";
import Main from "./components/admin/components/layout/Main";
import Categories from "./components/admin/pages/categories";
import CompanyAdmin from "./components/admin/pages/company";
import CompanyDetails from "./components/admin/pages/companyDetails/companyDetails";
import Home from "./components/admin/pages/Home";
import InvestorAdmin from "./components/admin/pages/investor";
import Profile from "./components/admin/pages/Profile";
import Homepage from "./components/homepage";

import Navbar from "./components/navbar.js";
import Signup from "./components/Signup";
import Signin from "./components/singin";
import {
  CompanyRegisterPage,
  Details,
  ExplorePage,
  FooterLayout,
  LandingPage,
  PaymentPage,
  ProfilePage,
  UserProfilePage,
  WelcomePage,
} from "./pages";
import MyCompanyProfile from "./pages/MyCompanyProfile/myCompanyProfile";

import RaisePage from "./pages/RaisePage/RaisePage";

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
        <Route path="/company/:id" element={<MyCompanyProfile />}></Route>
        <Route path="/explore" element={<ExplorePage />}></Route>
        <Route path="/detail/:id" element={<Details />}></Route>
        <Route path="/category" element={<Categories />}></Route>
        <Route path="/raise" element={<FooterLayout />}>
          <Route index element={<RaisePage />} />
        </Route>
        <Route path="/payment/:id" element={<FooterLayout />}>
          <Route index element={<PaymentPage />} />
        </Route>
        <Route
          path="/CompanyRegister/:id"
          element={<CompanyRegisterPage />}
        ></Route>

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<Main />}>
          <Route path="" element={<Home />} />

          {/* There is no need of tables for now */}
          {/* <Route path="/dashboard/tables" element={<Tables />} /> */}
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/company_admin" element={<CompanyAdmin />} />
          <Route path="/dashboard/investor_admin" element={<InvestorAdmin />} />
          <Route
            path="/dashboard/company-details/:id"
            element={<CompanyDetails />}
          />

          {/* Add others routes of dashboard below */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

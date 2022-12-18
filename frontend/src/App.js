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
import WatchList from "./components/watchlist";
import {
  CompanyRegisterPage,
  Details,
  ExplorePage,
  FooterLayout,
  LandingPage,
  PaymentPage,
  ProfilePage,
  ProtectedRoute,
  UserProfilePage,
  WelcomePage,
} from "./pages";
import MyCompanyProfile from "./pages/MyCompanyProfile/myCompanyProfile";
import { Watchlist } from "./pages/ProfilePage/component";

import RaisePage from "./pages/RaisePage/RaisePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
     
       {/* <Route path="" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchList />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/company/:id"
          element={
            <ProtectedRoute>
              <MyCompanyProfile />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/explore" element={<ExplorePage />}></Route>
        <Route
          path="/detail/:id"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/category" element={<Categories />}></Route>
        <Route
          path="/raise"
          element={
            <ProtectedRoute>
              <FooterLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<RaisePage />} />
        </Route>
        <Route
          path="/payment/:id"
          element={
            <ProtectedRoute>
              <FooterLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PaymentPage />} />
        </Route>
        <Route
          path="/CompanyRegister/:id"
          element={
            <ProtectedRoute>
              <CompanyRegisterPage />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/company/edit/:id"
          element={<CompanyRegisterPage />}
        ></Route>

        {/* DASHBOARD ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        >
        

          {/* There is no need of tables for now */}
          {/* <Route path="/dashboard/tables" element={<Tables />} /> */}
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/company_admin"
            element={
              <ProtectedRoute>
                <CompanyAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/investor_admin"
            element={
              <ProtectedRoute>
                <InvestorAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/company-details/:id"
            element={
              <ProtectedRoute>
                <CompanyDetails />
              </ProtectedRoute>
            }
          />

          {/* Add others routes of dashboard below */}
         

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { ChakraProvider } from "@chakra-ui/react";
import "antd/dist/antd.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./components/admin/assets/styles/main.css";
import "./components/admin/assets/styles/responsive.css";
import Main from "./components/admin/components/layout/Main";
import CompanyAdmin from "./components/admin/pages/company";
import CompanyDetails from "./components/admin/pages/companyDetails/companyDetails";
import Home from "./components/admin/pages/Home";
import InvestorAdmin from "./components/admin/pages/investor";
import Profile from "./components/admin/pages/Profile";
import BlankPage from "./components/BlankPage";
import Feed from "./components/Feed";
import Homepage from "./components/homepage";
import Navbar from "./components/navbar.js";
import Signup from "./components/Signup";
import Signin from "./components/singin";
import WatchList from "./components/Watchlists";
import {
  CompanyRegisterPage,
  ContactPage,
  Details,
  ExplorePage,
  FooterLayout,
  IsloggedIn,
  LandingPage,
  PaymentPage,
  ProfilePage,
  ProtectedRoute,
  UserProfilePage,
  WelcomePage,
} from "./pages";
import EditCompanyPage from "./pages/CompanyRegisterPage/EditCompanyPage";
import MyCompanyProfile from "./pages/MyCompanyProfile/myCompanyProfile";

import ChatProvider from "./context/ChatProvider";
import Chat from "./pages/Chat";
import RaisePage from "./pages/RaisePage/RaisePage";

import Category from "./components/admin/pages/Category";
import Tag from "./components/admin/pages/Tag";
import Editpost from "./components/Editpostcard";
import Portfolio from "./components/Portfolio";
import ResetPassword from "./pages/resetPassword";

import "./css/style.css";
import UsersProfilePage from "./pages/UsersProfilePage/UsersProfilePage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/signup"
          element={
            <IsloggedIn>
              <Signup />
            </IsloggedIn>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <IsloggedIn>
              <Signin />
            </IsloggedIn>
          }
        ></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/contact-us" element={<ContactPage />}></Route>

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
            // <ProtectedRoute>
            <Homepage />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Feed />} />

          <Route path="one" element={<Portfolio />} />
          <Route path="two" element={<BlankPage />} />
          <Route path="three" element={<WatchList />} />
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <ChatProvider>
                <ChakraProvider>
                  <Chat />
                </ChakraProvider>
              </ChatProvider>
            </ProtectedRoute>
          }
        />

        <Route path="/editpost/:id" element={<Editpost />}></Route>
        {/* This is route for Not found */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profiles/:id"
          element={
            <ProtectedRoute>
              <UsersProfilePage />
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
          element={
            <ProtectedRoute>
              <EditCompanyPage />
            </ProtectedRoute>
          }
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
          <Route path="" element={<Home />} />

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
            path="/dashboard/categoryPage"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/categoryPage/:id"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/tagPage"
            element={
              <ProtectedRoute>
                <Tag />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/tagPage/:id"
            element={
              <ProtectedRoute>
                <Tag />
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
        {/* <Route path="" element={<ErrorPage />} /> */}
      </Routes>
    </>
  );
}

export default App;

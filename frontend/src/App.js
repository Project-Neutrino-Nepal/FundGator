import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ComProfile from './components/company/company_profile';
import Homepage from "./components/homepage";
import Navbar from './components/navbar.js';
import Signup from './components/Signup';
import Signin from './components/singin';
import { DetailPage, ExplorePage, LandingPage, ProfilePage, UserProfilePage, WelcomePage } from "./pages";
import CompanyDetails from './components/admin/company_details';
import Categories from './components/admin/categories';
import Home from './components/admin/pages/Home';
import Profile from './components/admin/pages/Profile';
import Tables from './components/admin/pages/Tables';


import Main from './components/admin/components/layout/Main';
import 'antd/dist/antd.min.css';
// import "antd/dist/antd.css";
import "./components/admin/assets/styles/main.css";
import "./components/admin/assets/styles/responsive.css";
import CompanyAdmin from './components/admin/pages/company';








function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/profile/:id" element={<ProfilePage />}></Route>
        <Route path="/profile" element={<UserProfilePage />}></Route>
        <Route path="/welcome" element={<WelcomePage />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route path="/explore" element={<ExplorePage />}></Route>
        <Route path="/company" element={<ComProfile />}></Route>
        <Route path="/detail" element={<DetailPage />}></Route>
        <Route path="/comdetails" element={<CompanyDetails/>}></Route>
        <Route path="/company" element={<ComProfile/>}></Route>
        <Route path="/admin-nav" element={<navbarAdmin/>}></Route>
        <Route path="/category" element={<Categories/>}></Route>
        
              
        
         {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<Main />}>
          <Route path="" element={<Home />} />
          <Route path="/dashboard/tables" element={<Tables />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/company_admin" element={<CompanyAdmin />} />

          {/* Add others routes of dashboard below */}
        </Route>
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;

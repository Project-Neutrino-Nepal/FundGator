import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.js'
import Signup from './components/Signup';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { Signin } from './components/singin';
import {LandingPage,ProfilePage,UserProfilePage,WelcomePage,ExplorePage,DetailPage} from "./pages"
import Homepage from "./components/homepage"
import ComProfile from './components/company/company_profile';
import CompanyDetails from './components/admin/company_details';



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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

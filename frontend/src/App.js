import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ComProfile from './components/company/company_profile';
import Homepage from "./components/homepage";
import Navbar from './components/navbar.js';
import Signup from './components/Signup';
import Signin from './components/singin';
import { DetailPage, ExplorePage, LandingPage, ProfilePage, UserProfilePage, WelcomePage } from "./pages";



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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

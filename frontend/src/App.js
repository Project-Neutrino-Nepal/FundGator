import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.js'
import Signup from './components/Signup';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { Signin } from './components/singin';
import {LandingPage,ProfilePage,UserProfilePage,WelcomePage,ExplorePage} from "./pages"
import Homepage from "./components/homepage"
import ComProfile from './components/company/company_profile';
import Overview from './components/company/overview';
import Update from './components/company/updates';
import Question from './components/company/question';


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
        <Route path="/comProfile" element={<ComProfile/>}></Route>
        <Route path="/overview" element={<Overview/>}></Route>
        <Route path="/update" element={<Update/>}></Route>
        <Route path="questions" element={<Question />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

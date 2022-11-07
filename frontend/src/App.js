import "./App.css";
import { Navbar } from "./components/navbar.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/editprofile" element={<ProfilePage />}></Route>
        <Route path="/profile" element={<UserProfilePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

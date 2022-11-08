import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.js'
import {Signup} from './components/signup';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
<Navbar/>
<Routes>
  <Route path='/signup' element={<Signup/>}></Route>
</Routes>
{/* <Signup/> */}

   </BrowserRouter>
   
  );
}

export default App;

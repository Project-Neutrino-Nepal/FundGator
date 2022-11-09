import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar.js'
import Signup from './components/Signup';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { Signin } from './components/singin';

function App() {
  return (
   <BrowserRouter>
<Navbar/>
<Routes>
  <Route path='/signup' element={<Signup/>}></Route>
  <Route path='/signin' element={<Signin/>}></Route>
</Routes>

   </BrowserRouter>
   
  );
}

export default App;

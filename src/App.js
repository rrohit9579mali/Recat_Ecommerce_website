// src/App.js
import './App.css';
import Home from './screen/home';
import Login from './screen/login';
import Myorder from './screen/Myorder'
import Cart from '../src/screen/cart'
import SignUp from './screen/signUP'; // Ensure component name is uppercase
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/ContextReducer';
     
function App() {
  return ( 
    <CartProvider>
 <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />  
          <Route path="/signup" element={<SignUp />} />
          <Route path='cart' element={<Cart/>}/>
          <Route path='/myorder' element={<Myorder/>}/>
        </Routes>
      </div>
    </Router>
    </CartProvider>
   
  );
}
export default App;
// npm start 
// go on backend folder  cd backend  
// nodemon index.js 
import React, {useState} from 'react';
import {UserProvider} from './UserContext';
import  {Container} from "react-bootstrap";

import './App.css';
import AppNavbar from './components/AppNavbar';
// import Home from'./pages/Home';
// import Register from './pages/Register'
// import Login from './pages/Login'
// import Logout from './pages/Logout'
import PageNotFound from './components/PageNotFound'
// import Footer from './components/Footer';
// import Contact from './pages/Contact';
// import Menu from './pages/Menu';
// import UserDashboard from './pages/UserDashboard';

// for Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [user, setUser] = useState({
      accessToken: localStorage.getItem('accessToken'),
      email: localStorage.getItem('email'),
      isAdmin: localStorage.getItem('isAdmin') === 'true'
  })

  const unsetUser = () => {
      localStorage.clear()
  }

  return (
    <UserProvider value = {{user, setUser, unsetUser}}>
      <Router>
        <AppNavBar />
        <Container>
            <Routes>
              {/*<Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              */}<Route path='*' element={<PageNotFound />} />
            </Routes>
        </Container>  
        {/*<Footer /> */}
      </Router>
    </UserProvider>

  );


}

export default App;
// document.body.style.backgroundImage = "linear-gradient(to right, red, blue)";
 // document.body.style.backgroundImage = `linear-gradient(288deg, rgb(232, 218, 254) 0%, rgb(251, 229, 218) 100%)`
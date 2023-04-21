import React, {useState} from 'react';
import {UserProvider} from './UserContext';
import  {Container} from "react-bootstrap";

import './App.css';
import AppNavbar from './components/AppNavbar';
import Home from'./pages/Home';
import MyAccount from'./pages/MyAccount';
import UserSavings from './pages/UserSavings'
import SharedCapitalPage from './pages/SharedCapitalPage'
import UserLoan from './pages/UserLoans'
import UserProfiles from './pages/UserProfiles'
import ChangePasswor from './pages/ChangePassword'
import LoanCalculator from './pages/LoanCalculator'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register';
import AddUser from './components/AddUser';
import PrintSavings from './pages/PrintSavings';
import PrintSharedCapital from './pages/PrintSharedCapital';
import PrintUserLoans from './pages/PrintUserLoans';
import HelpPage from './pages/HelpPage';

// import Login from './pages/Login'
import Logout from './pages/Logout'
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
        <AppNavbar />
        <Container>
            <Routes>
              <Route path="/" element={<Home />} />
             {/*{ <Route path="/contact" element={<Contact />} />*/}
              <Route path='/AddUser' element={<AddUser />} />
              <Route path='/register' element={<Register />} />
              <Route path='/userSavings' element={<UserSavings />} />
              <Route path='/userSharedCapital' element={<SharedCapitalPage />} />
              <Route path='/userProfile' element={<UserProfiles />} />
              <Route path='/userLoan' element={<UserLoan />} />
              <Route path='/changePassword' element={<ChangePasswor />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/myAccount' element={<MyAccount />} />
              <Route path='/loanCalculator' element={<LoanCalculator />} />
              <Route path='/AdminDashboard' element={<AdminDashboard />} />
              <Route path='/PrintSavings' element={<PrintSavings />} />
              <Route path='/PrintSharedCapital' element={<PrintSharedCapital />} />
              <Route path='/HelpPage' element={<HelpPage />} />
              <Route path='/PrintUserLoans' element={<PrintUserLoans />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
        </Container>  
        {/*<Footer /> */}
      </Router>
    </UserProvider>

  );


}

export default App;
// document.body.style.backgroundImage = "linear-gradient(to right, red, blue)";
 // document.body.style.backgroundImage = `linear-gradient(288deg, rgb(232, 218, 254) 0%, #F5CBDD 100%)`
 document.body.style.backgroundColor = '#F5CBDD'
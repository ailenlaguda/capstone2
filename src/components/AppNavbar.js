import React, {useContext} from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export default function AppNavbar(){

	const {user} = useContext(UserContext);
	 // When the user scrolls down 20px from the top of the document, show the button
	 // const userType = localStorage
	return (
			<Navbar expand="lg" sticky="top">
				{/*<img src={require("../images/banner.png")} width="50"/>*/}
				{/*<Navbar.Brand className="ms-2" href="#">Loan & Saving Management System</Navbar.Brand>*/}
				{/*<Navbar.Brand className="ms-2" href="#">Loan & Saving Management System</Navbar.Brand>*/}
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>

				<Navbar.Collapse  id="basic-navbar-nav">
					<Nav className="ms-auto">

						{ (user.accessToken !== null) ?
							(localStorage.getItem('userType', user.userType) === "member" ) ?
								<>
									{/*<Nav.Link as={ Link } to='/'>Home</Nav.Link>*/}
									<Nav.Link as={ Link } to='/myAccount'>My Account</Nav.Link>
									<Nav.Link as={ Link } to='/LoanCalculator'>Apply Loan</Nav.Link>	
									<Nav.Link as={ Link } to='/logout'>Logout</Nav.Link>
									<Nav.Link as={ Link } to='/HelpPage'>Help</Nav.Link>
								</>
							:
								<>
									{/*<Nav.Link as={ Link } to='/'>Home</Nav.Link>*/}
									<Nav.Link as={ Link } to='/myAccount'>My Account</Nav.Link>
									<Nav.Link as={ Link } to='/LoanCalculator'>Apply Loan</Nav.Link>
									<Nav.Link as={ Link } to='/AdminDashboard'>Admin Dashboard</Nav.Link>
									<Nav.Link as={ Link } to='/logout'>Logout</Nav.Link>
									<Nav.Link as={ Link } to='/HelpPage'>Help</Nav.Link>

								</>
						:
							<>		
								<Nav.Link as={ Link } to='/'>Home</Nav.Link>
							</>	
						}

					</Nav>
				</Navbar.Collapse>
			</Navbar>

		)
}
import React, {useContext} from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export default function AppNavbar(){

	const {user} = useContext(UserContext);
	 // When the user scrolls down 20px from the top of the document, show the button
	return (
			<Navbar expand="lg" sticky="top">
				{/*<img src={require("../images/banner.png")} width="50"/>*/}
				<Navbar.Brand className="ms-2" href="#">Bentuco National High School Faculty Cooperative Loan & Saving Management System</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>

				<Navbar.Collapse  id="basic-navbar-nav">
					<Nav className="ms-auto">

						{ (user.accessToken !== null) ?
							<>	
								{
									(user.isAdmin === true) ?
										<>
											<Nav.Link as={ Link } to='/account'>My Account</Nav.Link>
											<Nav.Link as={ Link } to='/logout'>Logout</Nav.Link>
										</>

									:
										<>
											<Nav.Link as={ Link } to='/'>Home</Nav.Link>
											<Nav.Link as={ Link } to='/myAccount'>MyAccount</Nav.Link>
											<Nav.Link as={ Link } to='/contact'>Contact</Nav.Link>			
											<Nav.Link as={ Link } to='/logout'>Logout</Nav.Link>
										</>
								}
							</>
							:
							<>
								<Nav.Link as={ Link } to='/'>Home</Nav.Link>
								<Nav.Link as={ Link } to='/contact'>Contact Us</Nav.Link>
								<Nav.Link as={ Link } to='/login'>Login</Nav.Link>
							</>
						}

					</Nav>
				</Navbar.Collapse>
			</Navbar>

		)
}
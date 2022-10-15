import React, {useState, useEffect, useContext, useRef} from 'react';
import	{Form, Container, Row, Col, Button} from "react-bootstrap";
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import {Navigate, useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Home(){
	const [passwordShown, setPasswordShown] = useState(false);
	const[password,setPassword]=useState("password");

	const {user, setUser} = useContext(UserContext);
	const navigate = useNavigate();
	// // store values of input fields
	const [email, setEmail] = useState('');
	const [isActive, setIsActive] = useState(true);
	// const [isActive, setIsActive] = useState(true);
	
	 const togglePassword = () => {
    	// When the handler is invoked
	    // inverse the boolean state of passwordShown
	    setPasswordShown(!passwordShown);
	  };

	useEffect(()=>{
		
		if(email !=='' && password !== ''){
			setIsActive(true);
		} else{
			setIsActive(false);
		}
		
	}, [email, password])

	 const routeChange = () =>{ 
	  	navigate('/')
	 }

	function loginUser(e) {
		e.preventDefault();

		fetch('http://localhost:4000/users/login', {
		// fetch('https://gnhs-ssg-online-voting-system.herokuapp.com/students/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(response => response.json())
		.then(data => {
			
			console.log(data.email)

			if (data.message === "Incorrect Password"){

				Swal.fire({
				  title: 'error',
				  text: `Incorrect Password. Please try again!`,
				  icon:'error'
				})
				navigate('/')

			}else if(data.message === "Member not found"){
				Swal.fire({
						  title: 'Error',
						  text: `No record found`,
						  icon:'error'
				})

				navigate('/')

			} else{
				
				localStorage.setItem('accessToken', data.accessToken);					
				localStorage.setItem('userType', data.userType);					
				
				setUser({accessToken: data.accessToken})

				// if(data.userType === "Chairman"){
						
						localStorage.setItem('email', data.email);
						// localStorage.setItem('userType', data.userType);
						// localStorage.setItem('firstName', data.firstName);
						// localStorage.setItem('middleName', data.middleName);
						// localStorage.setItem('lastName', data.lastName);
						
						setUser({
							email: data.email,
							userType: data.userType,
							_id: data._id

						})

						setEmail('');
						setPassword('');

						Swal.fire({
						  title: 'Good job!',
						  text: `Login successful! Welcome!`,
						  icon:'success'
						})

						navigate('/myAccount')
					// remove other options
						// }else if(data.userType === "Treasurer"){
							
						// 	localStorage.setItem('email', data.email);
						// 	localStorage.setItem('userType', data.position);
						// 	localStorage.setItem('firstName', data.firstName);
						// 	localStorage.setItem('middleName', data.middleName);
						// 	localStorage.setItem('lastName', data.lastName);
						// 	setUser({
						// 		email: data.email,
						// 		isAdmin: data.isAdmin

						// 	})

						// 	setEmail('');
						// 	setPassword('');

						// 	Swal.fire({
						// 	  title: 'Good job!',
						// 	  text: `Login successful! Welcome Admin!`,
						// 	  icon:'success'
						// 	})

						// 	navigate('/TreasuereView')
						// }else {
						// 	localStorage.setItem('email', data.email);
						// 	localStorage.setItem('position', data.position);
						// 	localStorage.setItem('firstName', data.firstName);
						// 	localStorage.setItem('middleName', data.middleName);
						// 	localStorage.setItem('lastName', data.lastName);
						// 	setUser({
						// 		email: data.email,
						// 		isAdmin: data.isAdmin

						// 	})

						// 	setEmail('');
						// 	setPassword('');

						// 	Swal.fire({
						// 	  title: 'Good job!',
						// 	  text: `Login successful! Welcome Admin!`,
						// 	  icon:'success'
						// 	})

						// 	navigate('/memberView')
						// } 
			}

				
		})	

		// 	e.preventDefault();
		
	}
	
	const navToDashboard = () =>{
		<Navigate to='/myAccount' />
	}

	return(
		(user.accessToken !== null) ?
					
			<Navigate to="/myAccount" />
		:

		<Container>
		    <link rel="stylesheet" href="index.css"/>
		    <link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
			<link href="https://fonts.googleapis.com/css2?family=Lobster&family=Open+Sans&display=swap" rel="stylesheet"/>
		    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
			
			<Row className="justify-content-md-center">{/*
				<Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}><Highlights /></Col>
				<Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }} ><Banner /></Col>*/}	

				{/*<Row class="jumbotron text-center">*/}
				
				<div className="jumbotron container-fluid text-center">
						<h1 id="title1" className="display-4 p-0 mt-0">Bentuco National High School Faculty Cooperative</h1>
			  			<h3 className="display-5">Loan & Savings Management System</h3>
			  		
			  			<p className="lead"><strong>
			  				“Stop being chained down by bad credit I have the key to set you free...”― Tyler Gregory
			  			</strong></p>

				  	 	<Col className="lead justify-content-md-center" s={12} md={6}>	
							<Form className = "p-1 m-5" onSubmit={(e) => loginUser(e)} onClick = {()=>navToDashboard()}>
								<Form.Group >
									
									<Form.Control 
										type="email"
										className = "fontAwesome"
										placeholder = "&#xf0e0; ex.: juan@email.com"
										required	
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>									 
								</Form.Group>
								<Form.Group className = "mt-3">								
									<Form.Control 
										type={passwordShown? "text" :"password" }
										placeholder = "password"
										required
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
									<span><FontAwesomeIcon 
											onClick={togglePassword}
											icon={!passwordShown ? faEyeSlash : faEye} 
										/> Show/Hide Password</span>
								</Form.Group>						
								{isActive ?
										<Row className="mt-3 p-3">
											<Button className="loginBut" type="submit" > Login </Button>
											<Button className="mt-1" variant="secondary" onClick={()=>routeChange()}> Cancel </Button>
										</Row>
										:
										<Row className="mt-3 p-3" >
											<Button className="loginBut" type="submit" disabled> Login </Button>
											<Button className="mt-1" variant="secondary" onClick={()=>routeChange()}> Cancel </Button>
										</Row>
									}
								<p className="text-center"> Not yet a user? Contact the administrator <Link to={'/register'}>here</Link></p>
								
							</Form>
						</Col>
				</div>
			</Row>

		</Container>
	)
}
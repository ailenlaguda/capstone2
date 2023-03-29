import React, {useState, useEffect, useContext} from 'react';
import	{Form, Button, Row, Col} from "react-bootstrap";
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import {Navigate, useNavigate} from 'react-router-dom';
import Banner from '../components/Banner';

export default function AddUser(){

	const {user} = useContext(UserContext);
	const navigate = useNavigate();

	// store values of input fields
	const [employeeNumber, setEmployeeNumber] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [isActive, setIsActive] = useState(true);
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [sex, setSex] = useState('');
	const [mobileNum, setMobileNum] = useState('');
	const [address, setAddress] = useState('');
	const [position, setPosition] = useState('');
	const [memberType, setMemberType] = useState('');
	const [userType, setUserType] = useState('');

	useEffect(()=>{
		if(employeeNumber !=='' && email !== '' && password2 !=='' && password1!=='' && firstName !=='' && middleName!=='' && lastName!==''&& sex!==''&& mobileNum!==''&& address!==''&& position!==''&& memberType!==''&& userType!==''){
			
			if (password1 !== password2) {
				Swal.fire({
				  title: 'Password Mismatch',
				  text: 'Your password did not match. Try again!',
				  icon:'error'
				})
				setIsActive(false);
			} else {
				setIsActive(true);
			}
			

		} else{
			setIsActive(false);
		}
	}, [employeeNumber, email, password2, password1, firstName, middleName, lastName, sex, mobileNum, address, position, memberType, userType])
	
	function registerUser(e){
		e.preventDefault();


		fetch('https://bnhscoopbackend.herokuapp.com/users/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				employeeNumber:employeeNumber,
				email:email,
				password:password1,
				firstName:firstName,
				middleName:middleName,
				lastName:lastName,
				sex:sex,
				cp:mobileNum,
				address:address,
				position:position,
				memberType:memberType,
				userType:userType
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data)
			if (data === true){

				Swal.fire({
				  title: 'Good job!',
				  text: 'Registration successful! Login Now!',
				  icon:'success'
				})
				
				setEmployeeNumber('');
				setEmail('');
				setPassword1('');
				setPassword2('');
				setFirstName('');
				setMiddleName('');
				setLastName('');
				setSex('');
				setMobileNum('');
				setAddress('');
				setPosition('');
				setMemberType('');
				navigate('/AdminDashboard')
			} else{
				Swal.fire({
				  title: 'Error',
				  text: 'Registration unsuccessful! Try again!',
				  icon:'error'
				})
			}
		})			
	}

	return (

		(user.accessToken === null) ?

			<Navigate to="/" />
		:

			<Form className = "p-2" onSubmit={(e) => registerUser(e) }>
				<Row><Banner /></Row>
				<h1 className = "text-center mb-2">Register</h1>
				<Row>
					<Col xs={12} md={6}>
						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control 
								type="email"
								placeholder = "ex.: juan@email.com"
								required
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control 
								type="password"
								placeholder = "Enter password"
								required
								value={password1}
								onChange={e => setPassword1(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control 
								type="password"
								placeholder = "Verify password"
								required
								value={password2}
								onChange={e => setPassword2(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Employeer Number</Form.Label>
							<Form.Control 
								placeholder = "ex: 673439"
								required
								value={employeeNumber}
								onChange={e => setEmployeeNumber(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>First Name</Form.Label>
							<Form.Control 
								placeholder = "ex: Juan"
								required
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Middle Name</Form.Label>
							<Form.Control 
								placeholder = "ex: Dela Cruz"
								required
								value={middleName}
								onChange={e => setMiddleName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Last Name</Form.Label>
							<Form.Control 
								placeholder = "ex: Dela Cruz"
								required
								value={lastName}
								onChange={e => setLastName(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={6}>

						<Form.Group>
							<Form.Label>Sex</Form.Label>
							<Form.Control
								as="select"	 
								required
								value={sex}
								onChange={e => setSex(e.target.value)}
							>		
							  <option>Select here</option>
							  <option value="Male">Male</option>
							  <option value="Female">Female</option>
							</Form.Control>
							
						</Form.Group>

						<Form.Group>
							<Form.Label>Mobile Number</Form.Label>
							<Form.Control 
								placeholder = "09190093062"
								required
								value={mobileNum}
								onChange={e => setMobileNum(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Address</Form.Label>
							<Form.Control 
								placeholder = "Purok 1 Tabon-Tabon, Irosin, Sorsogon"
								required
								value={address}
								onChange={e => setAddress(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Position</Form.Label>
							<Form.Control 
								placeholder = "ex: 0917 1123 3289"
								required
								value={position}
								onChange={e => setPosition(e.target.value)}
							/>
						</Form.Group>
						
						<Form.Group>
							<Form.Label>Cooperative's Membership</Form.Label>
							<Form.Control
								as="select"	 
								required
								value={memberType}
								onChange={e => {setMemberType(e.target.value);
									if (e.target.value==="Chairman" || e.target.value==="Treasurer") {
										setUserType("admin")
									} else{
										setUserType("member")
									}
								}}>		
							  <option>Select here</option>
							  <option value="Member">Member</option>
							  <option value="Chairman">Chairman</option>
							  <option value="ViceChairman">Vice-Chairman</option>
							  <option value="Treasurer">Treasurer</option>
							  <option value="Secretary">Secretary</option>
							</Form.Control>
							
						</Form.Group>
						
						<Form.Group controlId="termsAndPrivacy" className="m-1">
						    <Form.Check
						        required
						        label={`By registering for an account, you agree to comply with our terms of service and privacy policy. You also confirm that you are at least 18 years old or have obtained parental consent to use our services.`}
						        feedback="You must agree before submitting."
						    />
						</Form.Group>
						
						{isActive ?
							<Button className="mt-3" variant="primary" type="submit" > Submit </Button>
							:
							<Button className="mt-3" variant="primary" type="submit" disabled> Submit </Button>
						}
					</Col>
				</Row>
			</Form>
	)
}
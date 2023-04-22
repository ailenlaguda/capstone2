import { Button, Modal, Form } from 'react-bootstrap';
import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';

// import emailjs from 'emailjs-com';
// import { init } from 'emailjs-com';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUserPlus  } from '@fortawesome/free-solid-svg-icons';

export default function RegisterAdmin() {
	const {user} = useContext(UserContext);

	// store values of input fields
	const [employeeNumber, setEmployeeNumber] = useState('');
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [sex, setSex] = useState('');
	const [mobileNum, setMobileNum] = useState('');
	const [address, setAddress] = useState('');
	const [position, setPosition] = useState('');
	const [memberType, setMemberType] = useState('');
	const [userType, setUserType] = useState('');


	//state for editCourse Modals to open/close
	const [showEdit, setShowEdit] = useState(false)

	//function for opening the modal
	const openEdit = () => {
		setShowEdit(true)
	}

	const closeEdit = () => {
		setShowEdit(false);
	}

   const registerUser = (event) =>{
    	
    	event.preventDefault();
    	
    	Swal.fire({
		    title: `Confirm Registration of new member`,
		    text: `Are you sure you want to add ${lastName}, ${firstName}?`,
		    icon: 'warning',
		    showCancelButton: true,
		    confirmButtonText: 'Yes, confirm',
		    cancelButtonText: 'Cancel',
		    reverseButtons: true
		  }).then((result) => {
		    
		    if (result.isConfirmed) {

				// fetch('http://localhost:4000/users/register', {
				fetch('https://bnhscoopbackend.herokuapp.com/users/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						employeeNumber:employeeNumber,
						email:email,
						password:"bnhsCoop2019",
						firstName:firstName,
						middleName:middleName,
						lastName:lastName,
						sex:sex,
						cp:mobileNum,
						address:address,
						position:position,
						memberType:memberType,
						userType:userType,
						activeStatus: true
					})
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					if (data === true){

						// const sendActivationEmail = async (userEmail, activationLink) => {
						  
						//   const templateParams = {
						//     to_email: userEmail,
						//     message: "Please click the activation link",
						//     activation_link: data.activationLink,
						//   };

						//   try {
						//     await emailjs.send(
						//       'service_y96qp6a', // Replace with your EmailJS service ID
						//       'template_7t8an6u', // Replace with your EmailJS template ID
						//       templateParams,
						//       'HGQnFZsC93TPHkWiz', // Replace with your EmailJS user ID
						//     );
						//     Swal.fire({
						// 	  title: 'Good job!',
						// 	  text: 'Registration successful! Tell the member to check his/her email and click the activation link!',
						// 	  icon:'success'
						// 	})
						//   } catch (error) {
						//     console.error(`Error sending activation email: ${error}`);
						    
						//   }

						Swal.fire({
						  title: 'Good job!',
						  text: 'Registration successful! Member may now log in',
						  icon:'success'
						})
						
						setEmployeeNumber('');
						setEmail('');
						// setPassword1('');
						// setPassword2('');
						setFirstName('');
						setMiddleName('');
						setLastName('');
						setSex('');
						setMobileNum('');
						setAddress('');
						setPosition('');
						setMemberType('');
						setUserType('');
						// navigate('/')
			
					} else if (data.message === "Email already registered"){
						Swal.fire({
						  title: 'Error',
						  text: 'Email already registered',
						  icon:'error'
						})
					} else{
						Swal.fire({
						  title: 'Error',
						  text: 'Registration unsuccessful! Employee ID already exist!',
						  icon:'error'
						})
					}
				})			
		    }else{
		    	setShowEdit(false);
		    }
		  })

   }
  
	
	

	return(
	  	(user.accessToken === null) ?
						
			<Navigate to="/" />
		:
			<>
				<Button title="Click to add new User" onClick={() => openEdit()} ><FontAwesomeIcon icon={faUserPlus } /></Button>

			{/*Edit Modal Forms*/}
				<Modal show={showEdit} onHide={closeEdit}>
					<Form onSubmit={event => registerUser(event)}>
						<Modal.Header closeButton>
							<Modal.Title>Register User </Modal.Title>
						</Modal.Header>

						<Modal.Body>
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
								<Form.Label>Employeer Number</Form.Label>
								<Form.Control 
									placeholder = "ex: 673439"
									required
									value={employeeNumber}
									type="number"
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
									type="number"
									value={mobileNum}
									onChange={(e) => {
								      const input = e.target.value;
								      if (/^\d{0,12}$/.test(input)) {
								        setMobileNum(input);
								      }
								    }}
								    maxLength="11"
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
									placeholder = "ex: Teacher I"
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
											setUserType("Admin")
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
			         </Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={closeEdit}>Close</Button>
							<Button variant="primary" type="submit">Submit</Button>
						</Modal.Footer>
					</Form>
					
				</Modal>
			</>
	)
}

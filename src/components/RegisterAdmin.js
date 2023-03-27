import { Button, Modal, Form, Container, Row, Table, Col } from 'react-bootstrap';
import React, {useState, useEffect, useContext} from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import {Navigate, useNavigate} from 'react-router-dom';
import Banner from '../components/Banner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserPlus  } from '@fortawesome/free-solid-svg-icons';

export default function RegisterAdmin() {

	const {user, setUser} = useContext(UserContext);
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

				fetch('http://localhost:4000/users/register', {
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
						setUserType('');
						setShowEdit(false);
					} else{
						Swal.fire({
						  title: 'Error',
						  text: 'Registration unsuccessful! Try again!',
						  icon:'error'
						})
					}
				})			
		    }else{
		    	setShowEdit(false);
		    }
		  })

   }

   function formatDate(isoDate) {
	  const dateObj = new Date(isoDate);
	  const year = dateObj.getFullYear();
	  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // add 1 to month since it's zero-based, and pad with zero if necessary
	  const day = dateObj.getDate().toString().padStart(2, '0'); // pad with zero if necessary
	  const formattedDate = `${year}-${month}-${day}`;
	  return formattedDate;
	}

  
	return(
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
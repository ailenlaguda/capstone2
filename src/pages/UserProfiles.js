import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Container, Col, Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

export default function UserProfiles() {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [position, setPosition] = useState('');
	const [tin, setTin] = useState('');
	const [cpNo, setCpNo] = useState('');
	const [sex, setSex] = useState('');
	const [membership, setMembership] = useState('');
	const [showAdd, setShowAdd] = useState(false);

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false)

		const fetchData = () => {
		// fetch('https://laguda-grocery-store-ol-shop.herokuapp.com/orders/all-auth-orders',{
			fetch(`http://localhost:4000/users/oneRecord/${localStorage.getItem('id')}`,{
			// fetch(`http://localhost/users/oneRecord/${user._id}`,{
				method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
						 'Accept': 'application/json'
					}
			})
			.then(res=> res.json())
			.then (data => {
				setFirstName(data.firstName)
				setMiddleName(data.middleName)
				setLastName(data.lastName)
				setPosition(data.position)
				setTin(data.tin)
				setCpNo(data.cp)
				setSex(data.sex)
				setMembership(data.userType)				
			})

		}

	useEffect(() => {
		fetchData();
	}, [])


	const [showEdit, setShowEdit] = useState(false)

	const openEdit = () => {
		//to still get the actual data from the form
		// fetch(`https://mysterious-taiga-31794.herokuapp.com/courses/${ courseId }`)
		
		setShowEdit(true)
	}

	const closeEdit = () => {
		setShowEdit(false);
	}

	const editProfile = (e) => {
		e.preventDefault();

		fetch(`http://localhost:4000/users/editProfile/`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`

			},
			body: JSON.stringify({
				firstName: firstName,
				middleName: middleName,
				lastName: lastName,
				tin: tin,
				cp: cpNo,
				position: position,
				sex:sex
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data === true){
				Swal.fire({
					title: "Success!",
					icon: 'success',
					text: 'Profile sucessfully edited'
				})
				closeAdd();
				fetchData();
			} else{
				Swal.fire({
					title: "Error!",
					icon: 'error',
					text: 'Something went wrong. Please try again'
				})
				closeAdd();
				fetchData();
			}
		})
	}
	
	const navToDashboard = () =>{
		navigate("/myAccount")
	}

	return(
	<>
		<Container>
			<Row>
				<Col>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>My profile</h2>
							</Card.Title>
							<Card.Text className="p-3 mt-3">	

								<Row>
									<Col xs={6} md={3}>First Name:</Col>
									<Col xs={6} md={3}>{firstName}</Col>
								</Row>
								<Row>
									<Col xs={6} md={3}>Middle Name:</Col>
									<Col xs={6} md={3}>{middleName}</Col>
								</Row>
								<Row>
									<Col xs={6} md={3}>Last Name:</Col>
									<Col xs={6} md={3}>{lastName}</Col>
								</Row>
								<Row>
									<Col xs={6} md={3}>Position:</Col>
									<Col xs={6} md={3}>{position}</Col>
								</Row>
								<Row>
									<Col xs={6} md={3}>TIN:</Col>
									<Col xs={6} md={3}>{tin}</Col>
								</Row>
								<Row>
									<Col xs={6} md={3}>Contact Number:</Col>
									<Col xs={6} md={3}>{cpNo}</Col>
								</Row>
								<Row>
									<Col xs={6} md={3}>Sex:</Col>
									<Col xs={6} md={3}>{sex}</Col>
								</Row>
								<Row>
									<Col xs={6} md={3}>Membership:</Col>
									<Col xs={6} md={3}>{membership}</Col>
								</Row>
								<Row>
									<Col xs={6} md={3}>Update Password:</Col>
									<Col xs={6} md={3}>Click Here <Link to={'/changePassword'}>here.</Link></Col>
								</Row>
								<Row>
									<Col xs={12} md={3}>
										<Button  className = "my-3 mx-1" variant="primary" onClick={openAdd}>Edit Profile</Button>
										<Button  className = "my-3 mx-1" variant="secondary" onClick={()=>navToDashboard()} >Back to Account.</Button>
									</Col>
								</Row>
							</Card.Text>
						</Card.Body>
					</Card>			
				</Col>
			</Row>
		</Container>	

		<Modal show={showAdd} onHide={closeAdd}>
			<Form onSubmit={e => editProfile(e)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Profile</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Group>
						<Form.Label>First Name</Form.Label>
						<Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Middle Name</Form.Label>
						<Form.Control type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} required/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Last Name</Form.Label>
						<Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} required/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Position</Form.Label>
						<Form.Control type="text" value={[position]} onChange={e => setPosition(e.target.value)} required/>
					</Form.Group>
					<Form.Group>
						<Form.Label>TIN</Form.Label>
						<Form.Control type="text" value={tin} onChange={e => setTin(e.target.value)} required/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Contact Number</Form.Label>
						<Form.Control type="text" value={cpNo} onChange={e => setCpNo(e.target.value)} required/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Sex</Form.Label>
						<Form.Select type="text" value={sex} onChange={e => setSex(e.target.value)} required>
							<option value="Female">Female</option>
							<option value="Male">Male</option>
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Label>Membership</Form.Label>
						<Form.Control type="text" readonly className="form-control-plaintext" defaultValue={membership} />
					</Form.Group>

				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={closeAdd}>Close</Button>
					<Button variant="success" type="submit">Submit</Button>
				</Modal.Footer>
			</Form>
				
		</Modal>
	</>

		)
}

import React, { useState, useEffect } from 'react';
import { Card, Row, Container, Col, Button, Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function ChangePasswor() {
	
	const [isActive, setIsActive] = useState(true);
	const [newPass1, setNewPass1] = useState('');
	const [newPass2, setNewPass2] = useState('');
	const [oldPassword, setOldPassword] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);
	 const togglePassword = () => {
    	// When the handler is invoked
	    // inverse the boolean state of passwordShown
	    setPasswordShown(!passwordShown);
	  };

	 const navigate = useNavigate();

	const editPassword = (e) => {
			e.preventDefault();
			
		// fetch('https://laguda-grocery-store-ol-shop.herokuapp.com/orders/all-auth-orders',{
			fetch(`https://bnhscoopbackend.herokuapp.com/users/retrievePass/`,{
			// fetch(`http://localhost/users/oneRecord/${user._id}`,{
				method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
						 'Accept': 'application/json'
					},
				body: JSON.stringify({
					oldPassword: oldPassword,
					newPass1: newPass1,
					newPass2: newPass2
				})
			})
			.then(res=> res.json())
			.then (data => {
				if (data.message === "Old Password is Incorrect! Try Again") {
					Swal.fire({
						title: "Error!",
						icon: 'error',
						text: 'Old password incorrect. Try Again'
					})
				} else if( data.message === "New Password do not much"){
					Swal.fire({
						title: "Error!",
						icon: 'error',
						text: 'New password do not match'
					})
				} else if (data === null){
					Swal.fire({
						title: "Error!",
						icon: 'error',
						text: 'Something went wrong, please try again'
					})
				} else{
					Swal.fire({
						title: "Success!",
						icon: 'success',
						text: 'Password successfully changed!'
					})
					navigate("/userProfile");
				}			
			})

		}


useEffect(()=>{
		
		if(newPass1 !=='' && newPass2 !== '' && oldPassword !== ''){
			setIsActive(true);
		} else{
			setIsActive(false);
		}
		
	}, [newPass1,newPass2,oldPassword])

const navToDashboard = () =>{
		navigate("/userProfile")
	}

	return(
		<>
		<Container>
			<Row>
				<Col xs={12} md={6}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body >
							<Card.Title>
								<h2>Change Password</h2>
							</Card.Title>
							<Card.Text className="p-3 mt-3">	

								<Form.Group className = "mt-3" >
									<Form.Label>Old Password</Form.Label>								
									<Form.Control 
										type={passwordShown? "text" :"password" }
										placeholder = "old password"
										required
										onChange={e => setOldPassword(e.target.value)}
									/>
								</Form.Group>	
								<Form.Group>
									<Form.Label>New Password</Form.Label>
									<Form.Control type={passwordShown? "text" :"password" } placeholder = "new password" required onChange = {e=> setNewPass1(e.target.value)}/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Re-type Password</Form.Label>
									<Form.Control type={passwordShown? "text" :"password" }  placeholder = "re-type new password" onChange = {e=> setNewPass2(e.target.value)} required/>
									<span><FontAwesomeIcon 
											onClick={togglePassword}
											icon={!passwordShown ? faEyeSlash : faEye} 
										/> Show/Hide Password</span>

								</Form.Group>

								{isActive ?
								<Row className="mt-3 p-3">
									<Button  className = "my-3 mx-1" variant="primary" onClick={editPassword}>Update Password</Button>
									<Button  className = "my-3 mx-1" variant="secondary" onClick={()=>navToDashboard()}>Back to Profile</Button>
								</Row>
								:
								<Row className="mt-3 p-3" >
									<Button  className = "my-3 mx-1" variant="primary" onClick={editPassword} disabled>Update Password</Button>
									<Button  className = "my-3 mx-1" variant="secondary" onClick={()=>navToDashboard()} >Back to Profile</Button>
								</Row>
							}
										
						
									
										
							</Card.Text>
						</Card.Body>
					</Card>			
				</Col>
			</Row>
		</Container>	
	</>

		)
}

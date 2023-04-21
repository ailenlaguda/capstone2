import { Button, Modal, Form, Table} from 'react-bootstrap';
import React, { useState} from 'react';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp  } from '@fortawesome/free-solid-svg-icons';

export default function ApproveUsers() {

	const [showEdit, setShowEdit] = useState(false)
	const [usersData, setUsersData] = useState([]);

	const openEdit = () => {
		setShowEdit(true);
	  fetch(`https://bnhscoopbackend.herokuapp.com/users/allRecordsPending`, {
	    method: 'GET',
	    headers: {
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	      'Accept': 'application/json'
	    }
	  })
	    .then(res => res.json())
	    .then(data => {
	     	console.log(data)
	     if (data && Array.isArray(data)){
	     	console.log("dito")
	        const savingsArr = data.map(saving => (
	          <tr key={saving._id}>
	            <td>{saving._id}</td>
	            {/*<td>{saving.email}</td>*/}
	            <td>{saving.firstName}</td>
	            <td>{saving.middleName}</td>
	            <td>{saving.lastName}</td>
	            <td>{saving.cp}</td>
	            <td>{saving.position}</td>
	            {/*<td>{saving.tin}</td>
	            <td>{saving.sex}</td>*/}
	            <td>
	            <Button 
	            	style={{ backgroundColor: "#101F60" }} 
	            	className="btnDanger" 
	            	variant="danger" 
	            	size="sm" 
	            	onClick={(event)=>approveUser(saving._id,event)} 
	            	title="Click to Reset Password"
  					>Approve
  				</Button>
  				</td>
	          </tr>
	        ));
	        setUsersData(savingsArr);
	        // console.log(usersData)
	     }

	    }).catch(err => {
	      console.error('Error fetching data:', err);
	    });
	}


	const closeEdit = () => {
		setShowEdit(false);
	}
	

    const approveUser = (userId, event) =>{
    	event.preventDefault();

    	Swal.fire({
		    title: `Confirm user's request for registration.`,
		    text: `Are you sure you want to confirm this user?`,
		    icon: 'warning',
		    showCancelButton: true,
		    confirmButtonText: 'Yes, confirm',
		    cancelButtonText: 'Cancel',
		    reverseButtons: true
		  }).then((result) => {
		    
		    if (result.isConfirmed) {
		      
	       		fetch(`https://bnhscoopbackend.herokuapp.com/users/updateActiveStat/${userId}`, 
	       		// fetch(`http://localhost:4000/users/updateActiveStat/${userId}`, 
		       	{
				    method: 'PUT',
				    headers: {
				      'Content-Type': 'application/json',
				      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				      'Accept': 'application/json'
				    }
			 	})
		       	.then(res => res.json())
			    .then(data => {
			    	
			    	// console.log(data)
			    	Swal.fire({
		               title: 'Member Registration Approve',
		               text: ' The Member has been approved.',
		               icon:'success'
		             })
		             setShowEdit(false)
			    })
		    } else {
		      	Swal.close();
		    }
		 });
    }



	return(
		<>
			
		        <Button title="Approve User" onClick={() => openEdit()}><FontAwesomeIcon icon={faThumbsUp} /></Button>

		{/*Edit Modal Forms*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form>
					<Modal.Header closeButton>
						<Modal.Title>Member's Registration Approval</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<Table striped bordered hover responsive>
							<thead style={{ backgroundColor: "#101F60", color: "white" }}>
								<tr>
									<th>Employee No.</th>
									{/*<th>E-mail</th>*/}
									<th>First Name</th>
									<th>Middle Name</th>
									<th>Last Name</th>
									<th>CP No.</th>
									<th>Position</th>
								{/*	<th>TIN</th>
									<th>Sex</th>
								*/}	<th colSpan="1" style={{textAlign: 'center'}}>Manage Account</th>

								</tr>
							</thead>

							<tbody>
								{usersData}
							</tbody>
						</Table>
						
		            </Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
					</Modal.Footer>
				</Form>
				
			</Modal>
		</>
	)
}

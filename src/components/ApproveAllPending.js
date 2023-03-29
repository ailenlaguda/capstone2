import { Button, Modal, Form,  Table } from 'react-bootstrap';
import React, { useState} from 'react';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle  } from '@fortawesome/free-solid-svg-icons';

export default function ApproveAllPending({firstName, lastName, loan, fetchData}) {

	//state for courseId for the fetch URL

	//Forms state
	//Add state for the forms of course
	
	const [paymentSchedules2, setPaymentSchedules2] = useState([]);
	//state for editCourse Modals to open/close
	const [showEdit, setShowEdit] = useState(false)

	//function for opening the modal
	const openEdit = () => {
		setShowEdit(true)
		fetch(`https://bnhscoopbackend.herokuapp.com/loans/retrieveAllPendingLoan/`, {
	    method: 'GET',
	    headers: {
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	      'Accept': 'application/json'
	    }
	  	})
	    .then(res => res.json())
	    .then(data => {
	    	let usersPendingLoan = []
	      // if (data) {
	      if (data.message !== "No records found") {

	            usersPendingLoan = data.data.users
	            const pendingUsers = usersPendingLoan.map(pendingUser => (
				  <tr key={pendingUser._id}>
		            <td>{pendingUser._id}</td>
		            {/*<td>{saving.email}</td>*/}
		            <td>{pendingUser.firstName}</td>
		            <td>{pendingUser.middleName}</td>
		            <td>{pendingUser.lastName}</td>
		            <td>{pendingUser.cp}</td>
		            <td>{pendingUser.position}</td>
		            {/*<td>{saving.tin}</td>
		            <td>{saving.sex}</td>*/}
		            <td>
		            	<Button 
			            	style={{ backgroundColor: "#101F60" }} 
			            	variant="success" 
			            	onClick={(event)=>approveLoan(pendingUser._id,event)}>Approve
			            </Button>
			        </td>
		            
		          </tr>
			    ));

			    setPaymentSchedules2(pendingUsers)
			  
			} else{

				setPaymentSchedules2([])
				Swal.fire({
							title: 'No pending loan',
							icon: 'success',
							text: 'Great Job, no pending loan.'
						})
						fetchData()
						setShowEdit(false)
			}
		})
	}


	const closeEdit = () => {
		setShowEdit(false);
	}


    const approveLoan = (loanID, event) =>{
    	console.log(loanID)
    	event.preventDefault();

    	Swal.fire({
		    title: `Confirm loan approval`,
		    text: `Are you sure you want to confirm this loan?`,
		    icon: 'warning',
		    showCancelButton: true,
		    confirmButtonText: 'Yes, confirm',
		    cancelButtonText: 'Cancel',
		    reverseButtons: true
		  }).then((result) => {
		    
		    if (result.isConfirmed) {
		      
	       		fetch(`https://bnhscoopbackend.herokuapp.com/loans/approveLoan/${loanID}`, 
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
			    	
			    	console.log(data)
			    	Swal.fire({
		               title: 'Loan Application Approve',
		               text: 'The loan application has been approved.',
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
			
		        <Button title="Approve Pending Loans" onClick={() => openEdit()}><FontAwesomeIcon icon={faCheckCircle} /></Button>

		{/*Edit Modal Forms*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form>
					<Modal.Header closeButton>
						<Modal.Title>Loan for Approval</Modal.Title>
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
								*/}	<th colSpan="1" style={{textAlign: 'center'}}>Accounts Actions</th>

								</tr>
							</thead>

							<tbody>
								{paymentSchedules2}
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

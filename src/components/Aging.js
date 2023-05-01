import { Button, Modal, Form,  Table } from 'react-bootstrap';
import React, { useState, useRef} from 'react';
import Swal from 'sweetalert2';
	import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle  } from '@fortawesome/free-solid-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

export default function GenerateAgingReport({fetchData}) {
	
	const componentRef = useRef();
	  const handlePrint = useReactToPrint({
	    content: () => componentRef.current,
	  });
	const [paymentSchedules2, setPaymentSchedules2] = useState([]);
	//state for editCourse Modals to open/close
	const [showEdit, setShowEdit] = useState(false)

	//function for opening the modal
	const openEdit = () => {
		setShowEdit(true)
		fetch(`https://bnhscoopbackend.herokuapp.com/loans/allOverDueBalance/`, {
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
	      if (data.message !== "No accounts receivables records.") {

	            usersPendingLoan = data.data.users
	            const pendingUsers = usersPendingLoan.map(pendingUser => (
				  <tr key={pendingUser._id}>
		           
		            <td>{pendingUser.firstName}</td>
		            <td>{pendingUser.middleName}</td>
		            <td>{pendingUser.lastName}</td>
		            <td>{pendingUser.cp}</td>
		            
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


	return(
		<>
			
		        <Button title="Generate Aging Report" onClick={() => openEdit()}>Generate Past Due Reports</Button>

		{/*Edit Modal Forms*/}
			<Modal show={showEdit} onHide={closeEdit} >
				<Form>
					<Modal.Header closeButton>
						<Modal.Title>Accounts Receivables</Modal.Title>
					</Modal.Header>

					<Modal.Body ref={componentRef}>
						<div className="text-center my-4">
				            <img src="bnhs_logo.png" alt="School Logo" />
				            <h2>Bentuco National High School Faculty Cooperative</h2>
				            <h3>Bentuco, Gubat, Sorsogon</h3>
				            <h4> Loans & Savings Management System</h4>
				            <h4>Accounts Receivables</h4>
				        </div>
						<Table striped bordered hover responsive>
							<thead style={{ backgroundColor: "#101F60", color: "white" }}>
								<tr>
									
									<th>First Name</th>
									<th>Middle Name</th>
									<th>Last Name</th>
									<th>Overdue Amount</th>

								</tr>
							</thead>

							<tbody>
								{paymentSchedules2}
							</tbody>
						</Table>
						
		            </Modal.Body>
					<Modal.Footer>
						<Button title="Print Transactions" onClick={handlePrint}><FontAwesomeIcon icon={faPrint} /></Button>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
					</Modal.Footer>
				</Form>
				
			</Modal>
		</>
	)
}

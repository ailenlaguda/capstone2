import { Button, Modal, Form, Container, Row, Table, Col } from 'react-bootstrap';
import React, { useState} from 'react';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye  } from '@fortawesome/free-solid-svg-icons';

export default function LoanSummary({firstName, lastName, loan, fetchData}) {

	//state for courseId for the fetch URL
	const [loanId, setLoanId] = useState('');

	//Forms state
	//Add state for the forms of course
	const [loanData, setLoanData] = useState([]);
	const [loans, setLoans] = useState([])

	const [date, setDate] = useState('');
	const [currLoanBalance, setcurrLoanBalance] = useState('');
	const [principalAmount, setPrincipalAmount] = useState('');
	const [interest, setInterest] = useState('');
	const [term, setTerm] = useState('');
	const [isActive, setIsActive] = useState('');
	const [description, setDescription] = useState('');
	const [transType, setTransType] = useState('');
	const [paymentSchedules, setPaymentSchedules] = useState([]);
	const [paymentSchedules2, setPaymentSchedules2] = useState([]);
	const [pending, setPending] = useState([]);
	const [pendingStat, setPendingStat] = useState([true]);
	const [loanID, setLoanID] = useState([true]);
	const [employeeNumber, setEmployeeNumber] = useState([true]);

	//state for editCourse Modals to open/close
	const [showEdit, setShowEdit] = useState(false)

	//function for opening the modal
	const openEdit = (loanId) => {
		setShowEdit(true)
		fetch(`http://localhost:4000/loans/loanRecord/${loanId}`, {
	    method: 'GET',
	    headers: {
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	      'Accept': 'application/json'
	    }
	  })
	    .then(res => res.json())
	    .then(data => {

	      if (data) {
	      // if (data.message === "No records found") {
	      	setLoanID(data._id);
            setDate(data.date);
            setcurrLoanBalance(data.currLoanBalance);
            setPrincipalAmount(data.principalAmount);
            setInterest(data.interest);
            setTerm(data.term);
            setIsActive(data.isActive);
            setPaymentSchedules(data.paymentSchedules);
            setEmployeeNumber(data.employeeNumber);
            if (data.applicationStatus !== "Pending") {
            	setPendingStat(false)
            } else{
            	setPendingStat(true)

            }

            if (data.isActive === false && data.applicationStatus === "Pending") {
			    setPending(
			        <Form.Group>
			            <Form.Label>*This loan is pending for approval</Form.Label><br />
			            <Button 
			            	style={{ backgroundColor: "#101F60" }} 
			            	variant="success" 
			            	onClick={(event)=>approveLoan(event)}>Approve</Button>
			        </Form.Group>
			    );
			}

            const paymentSchedules1 = paymentSchedules.map(schedule => (
	            <tr key={schedule._id}>
	                <td>{formatDate(schedule.date)}</td>
	                <td>{dollarUSLocale.format(schedule.amount)}</td>
	                <td>{(schedule.paidStatus) ? "Paid" : "Not Paid"}</td>
	                <td>{(schedule.overDueStat) ? `Overdue: ${dollarUSLocale.format(schedule.amount*.01)}` : ``}</td>
	               <td>
					  {schedule.paidStatus 
					    ? `Paid: ${dollarUSLocale.format(schedule.AmountPaid)}` 
					    : pendingStat ? "For Approval" : <button onClick={(event) => handlePayment(schedule._id, schedule.amount, employeeNumber, schedule.overDueStat,event)}>Pay Due</button> }
					</td>
	            </tr>
		    	));

		    setPaymentSchedules2(paymentSchedules1)
	      } 

	    })
	    .catch(err => {
	      console.error('Error fetching data:', err);
	    });
	}

	const closeEdit = () => {
		setShowEdit(false);
	}

	const [paymentAmount, setPaymentAmount] = useState(0);

   
   const approveLoan = (event) =>{  	
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
		      
	       		fetch(`http://localhost:4000/loans/approveLoan/${loanID}`, 
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
			    })
		    } else {
		      	Swal.close();
		    }
		 });
   }


   const handlePayment = (id, amount, employeeNumber, overDueStat,event) => {

       event.preventDefault();
       
       if (overDueStat===false) {

       	Swal.fire({
		    title: `Confirm Payment not overdue`,
		    text: `Are you sure you want to pay ${dollarUSLocale.format(amount)}?`,
		    icon: 'warning',
		    showCancelButton: true,
		    confirmButtonText: 'Yes, pay now',
		    cancelButtonText: 'Cancel',
		    reverseButtons: true
		  }).then((result) => {
		    
		    if (result.isConfirmed) {
		      
	       		fetch(`http://localhost:4000/loans/loansrecord/${id}`, {
					    method: 'PUT',
					    headers: {
					      'Content-Type': 'application/json',
					      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
					    },
					    body: JSON.stringify({
			               amountPaid: amount,
			               employeeNumber: employeeNumber,
			               overDueStat:overDueStat
				       })
			 		})
		       	.then(res => res.json())
			    	.then(data => {
			    		console.log(data)
				    	if (data.message !==undefined) {

					    	Swal.fire({
				               title: 'Good job!',
				               text: 'Payment Confirmed.',
				               icon:'success'
				             })
					    setShowEdit(false);
				    	} else {
						    Swal.fire({
					               title: 'Error',
					               text: 'Please contact IT Admin.',
					               icon:'error'
					             })
						    setShowEdit(false);

				    	}
			    })
		    } else {
		      	Swal.close();
		    }
		 });

       } else {
	      
       		Swal.fire({
			    title: `Confirm Payment`,
			    text: `Are you sure you want to pay ${dollarUSLocale.format(amount + (amount*.03))}?`,
			    icon: 'warning',
			    showCancelButton: true,
			    confirmButtonText: 'Yes, pay now',
			    cancelButtonText: 'Cancel',
			    reverseButtons: true
			  }).then((result) => {
			    if (result.isConfirmed) {
			       fetch(`http://localhost:4000/loans/loansrecord/${id}`, 
			       	{
					    method: 'PUT',
					    headers: {
					      'Content-Type': 'application/json',
					      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
					    },
					    body: JSON.stringify({
			               amountPaid: amount + (amount*.03),
			               overDueStat:overDueStat
			            })
				 	})
			       	.then(res => res.json())
				    .then(data => {
				    	if (data) {

					    	Swal.fire({
				               title: 'Good job!',
				               text: 'Payment Confirmed.',
				               icon:'success'
				             })
					    setShowEdit(false);
				    	} else {
						    Swal.fire({
					               title: 'Error',
					               text: 'Please contact IT Admin.',
					               icon:'error'
					             })
						    setShowEdit(false);

				    	}
				    })
			      
			    } else {
			     	Swal.close();
			    }
			  });
       }
    }

    function formatDate(isoDate) {
	  const dateObj = new Date(isoDate);
	  const year = dateObj.getFullYear();
	  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // add 1 to month since it's zero-based, and pad with zero if necessary
	  const day = dateObj.getDate().toString().padStart(2, '0'); // pad with zero if necessary
	  const formattedDate = `${year}-${month}-${day}`;
	  return formattedDate;
	}

  	let dollarUSLocale = Intl.NumberFormat('en-US');

	return(
		<>
			<Button style={{ backgroundColor: '#FF66C4' }}
		        className="btnSaving bg-purple"
		        variant="secondary"
		        size="sm" onClick={() => openEdit(loan)} ><FontAwesomeIcon icon={faEye } /> Loan Record</Button>

		{/*Edit Modal Forms*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form>
					<Modal.Header closeButton>
						<Modal.Title>Loan Details of {lastName}, {firstName} </Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Date</Form.Label>
							<Form.Control type="text" defaultValue ={formatDate(date)} disabled required/>
						</Form.Group>
						<Form.Group>
						  <Form.Label>Current Loan Balance</Form.Label>
						  <Form.Control type="text" value={`₱${dollarUSLocale.format(currLoanBalance)}`} readOnly required />
						</Form.Group>
						<Form.Group>
							<Form.Label>Principal Amount</Form.Label>
							<Form.Control type="text" defaultValue ={`₱${dollarUSLocale.format(principalAmount)}`} disabled required/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Interest</Form.Label>
							<Form.Control type="text" defaultValue ={`${interest}% (at 1% p.m.)`} disabled required/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Term</Form.Label>
							<Form.Control type="text" defaultValue ={`${term} months`} disabled required/>
						</Form.Group>
						<br />
						<Form.Group>
							<Form.Label>Payment Schedule</Form.Label>
							<Container>
								<Row>
									<Col>
										<Table striped bordered hover responsive>
											<thead className="bg-dark text-white">
												<tr>
													<th>Due Date:</th>
													<th>Amount</th>
													<th>Paid Status</th>
													<th>Penalty</th>
													<th>Action</th>
												</tr>
											</thead>

											<tbody>
												{paymentSchedules2}
											</tbody>
										</Table>
									</Col>
								</Row>
							</Container>
						</Form.Group>
							{pending}	
		               
		            </Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
					</Modal.Footer>
				</Form>
				
			</Modal>
		</>
	)
}

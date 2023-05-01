import React, { useState, useEffect, useRef } from 'react';
import { Table, Row, Container, Col, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { faPrint } from '@fortawesome/free-solid-svg-icons';
  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReactToPrint } from 'react-to-print';

export default function UserLoan() {
	
	const componentRef = useRef();
	const componentRef1 = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  	const navigate = useNavigate();

	const handlePrintModal = useReactToPrint({
	    content: () => componentRef1.current,
	  });
	const [loansData, setLoanData] =  useState([])
	const [loanPayment, setLoanPayment] =  useState([])
	const [loanPaymentData, setLoanPaymentData] =  useState([])
	
	const navToDashboard = () =>{
    	navigate("/myAccount")
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
	// let dateLocale = new Intl.DateTimeFormat('en-US' /*, o*/)

	const fetchData = () => {

		fetch(`https://bnhscoopbackend.herokuapp.com/loans/retrieveLoanAllLoan/${localStorage.getItem('id')}`,{
	
			method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					 'Accept': 'application/json'
				}
		})
		.then(res=> res.json())
		.then (data => {

			console.log(data)

			const savingsArr = data.map(saving => {
			    return (
			        <tr key={saving._id}>
			            <td>{formatDate(saving.date)}</td>
			            <td>{dollarUSLocale.format(saving.principalAmount)}</td>
			            <td>{saving.applicationStatus==="Fully Paid" ? "Loan fully paid": dollarUSLocale.format(saving.currLoanBalance)} </td>
			            <td>{saving.term}</td>
			            <td>{<Button variant="primary" size="sm" onClick={() => openEdit(saving._id)}>View</Button>}</td>
			        </tr>
			    )
			})

			console.log(savingsArr)
			setLoanData(savingsArr)	
		})

	}

	const openEdit = (loanId) => {
		console.log(loanId)
		//to still get the actual data from the form
		// fetch(`https://mysterious-taiga-31794.herokuapp.com/courses/${ courseId }`)
		fetch(`https://bnhscoopbackend.herokuapp.com/loans/loansrecord/${loanId}`)
		.then(res => res.json())
		.then(data => {
			//populate all the input values with course info that we fetched
			// console.log(data)
			setLoanPayment(data)
			console.log(data)
			
			const savingsInterestArr = loanPayment.map(savingInt => {
			return (
				<tr key={savingInt._id}>
					<td>{formatDate(savingInt.date)}</td>
					<td>{dollarUSLocale.format(savingInt.amount)}</td>
					<td>{savingInt.paidStatus ? "Paid": "Not yet Paid"}</td>
					
				</tr>
			)
			})
			setLoanPaymentData(savingsInterestArr)
		})

		//Then, open the modal
		setShowEdit(true)
	}

	useEffect(() => {
	  fetchData();
	}, []);

	const [showEdit, setShowEdit] = useState(false)

	

	const closeEdit = () => {
		setShowEdit(false);
	}

	const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  fetch(`https://bnhscoopbackend.herokuapp.com/users/oneRecord/${localStorage.getItem('id')}`,{
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
      setLastName(data.lastName)
      setMiddleName(data.middleName)
      setPosition(data.position)
    })
	return(
		<>
		<Container  ref={componentRef}>
			<Row>
				<div className="text-center my-4">
		            <img src="bnhs_logo.png" alt="School Logo" />
		            <h2>Bentuco National High School Faculty Cooperative</h2>
		            <h3>Bentuco, Gubat, Sorsogon</h3>
		            <h4> Loans & Savings Management System</h4>
		            <h4>Loans Transactions</h4>
	        	</div>
	        	<div> 
			            <h5>{lastName}, {firstName} {middleName} </h5>
			            <h5>{position} </h5>
			          </div>
				<Col>
					<div className="text-center my-4">
						<h1> Loans Transactions</h1>
					</div>
					<Table striped bordered hover responsive>
						<thead className="bg-dark text-white">
							<tr>
								<th>Date</th>
								<th>Principal Amount</th>
								<th>Outstanding Balance</th>
								<th>Term</th>
								{/*<th>Description</th>
								<th>Price</th>
								<th>Availability</th>
								<th colSpan='2'>Actions</th>*/}
								<th>Payment Schedules</th>
							</tr>
						</thead>

						<tbody>
							{loansData}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
			<Button title="Print Transactions" onClick={handlePrint}><FontAwesomeIcon icon={faPrint} /></Button>
       	 	<Button  className = "my-3 mx-1" variant="secondary" onClick={()=>navToDashboard()} >Back to Account.</Button>
				{/*Edit Modal Forms*/}
				<Modal show={showEdit} onHide={closeEdit}>
						<Modal.Header closeButton>
							<Modal.Title>Payment Schedules</Modal.Title>
						</Modal.Header>

						<Modal.Body ref={componentRef1}>
							<div className="text-center my-4">
					            <img src="bnhs_logo.png" alt="School Logo" />
					            <h2>Bentuco National High School Faculty Cooperative</h2>
					            <h3>Bentuco, Gubat, Sorsogon</h3>
					            <h4> Loans & Savings Management System</h4>
					            <h4>Loan Payment Schedules</h4>
				        	</div>
										<Table striped bordered hover responsive>
								<thead className="bg-dark text-white">
							<tr>
								<th>Date</th>
								<th>Amount</th>
								<th>Payment Status</th>
							</tr>
								</thead>

								<tbody>
									{loanPaymentData}
								</tbody>
							</Table>
						</Modal.Body>

						<Modal.Footer>
							<Button title="Print Transactions" onClick={handlePrintModal}><FontAwesomeIcon icon={faPrint} /></Button>
							<Button variant="secondary" onClick={closeEdit}>Close</Button>
						</Modal.Footer>
				</Modal>
		</>

		)
}

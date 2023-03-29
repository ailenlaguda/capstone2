import React, { useState, useEffect, useCallback } from 'react';
import { Table, Row, Container, Col, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { faPrint } from '@fortawesome/free-solid-svg-icons';
  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function UserLoan() {
	console.log("YADIS")
	const print = () => {
        window.print()
    }
  	const navigate = useNavigate();
	const [loans, setLoans] = useState([])
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
		// fetch('https://laguda-grocery-store-ol-shop.herokuapp.com/orders/all-auth-orders',{
			fetch(`https://bnhscoopbackend.herokuapp.com/loans/retrieveLoanAllLoan/${localStorage.getItem('id')}`,{
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

				setLoans(data)
				console.log(data)
				

				const savingsArr = loans.map(saving => {
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

				setLoanData(savingsArr)	
			})

		}

		useEffect(() => {
			fetchData();
		}, [])

	const [showEdit, setShowEdit] = useState(false)

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

	const closeEdit = () => {
		setShowEdit(false);
	}


	return(
		<>
		<Container>
			<Row>
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
			<Button title="Print Transactions" onClick={() => print()}><FontAwesomeIcon icon={faPrint} /></Button>
       	 	<Button  className = "my-3 mx-1" variant="secondary" onClick={()=>navToDashboard()} >Back to Account.</Button>
		</Container>
				{/*Edit Modal Forms*/}
				<Modal show={showEdit} onHide={closeEdit}>
						<Modal.Header closeButton>
							<Modal.Title>Payment Schedules</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Table striped bordered hover responsive>
								<thead className="bg-dark text-white">
							<tr>
								<th>Date</th>
								<th>Amount</th>
								<th>Payment Status</th>
								{/*<th>Description</th>
								<th>Price</th>
								<th>Availability</th>
								<th colSpan='2'>Actions</th>*/}
							</tr>
								</thead>

								<tbody>
									{loanPaymentData}
								</tbody>
							</Table>
						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary" onClick={closeEdit}>Close</Button>
						</Modal.Footer>
				</Modal>
		</>

		)
}

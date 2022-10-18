import React, { useState, useEffect, useCallback } from 'react';
import { Table, Row, Container, Col, Button, Modal } from 'react-bootstrap';


export default function UserLoan() {

	const [loans, setLoans] = useState([])
	const [loansData, setLoanData] =  useState([])
	const [loanPayment, setLoanPayment] =  useState([])
	const [loanPaymentData, setLoanPaymentData] =  useState([])
	
	
		const fetchData = () => {
		// fetch('https://laguda-grocery-store-ol-shop.herokuapp.com/orders/all-auth-orders',{
			fetch(`http://localhost:4000/loans/loansrecord/${localStorage.getItem('email')}`,{
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
					
				const savingsArr = loans.map(saving => {
					return (
						<tr key={saving._id}>
							<td>{saving.date}</td>
							<td>{saving.principalAmount}</td>
							<td>{saving.outBalance}</td>
							<td>{saving.term}</td>
							<td>{saving.isActive}</td>
							<td>{<Button variant="primary" size="sm" onClick={() => openEdit(saving._id)}>View</Button>}</td>

						</tr>

					)

				})

				setLoanData(savingsArr)	
	
			})

		}

	const [showEdit, setShowEdit] = useState(false)

	const openEdit = (loanId) => {
		console.log(loanId)
		//to still get the actual data from the form
		// fetch(`https://mysterious-taiga-31794.herokuapp.com/courses/${ courseId }`)
		fetch(`http://localhost:4000/loans/loansrecord/${loanId}`)
		.then(res => res.json())
		.then(data => {
			//populate all the input values with course info that we fetched
			console.log(data)
			setLoanPayment(data)
			
			const savingsInterestArr = loanPayment.map(savingInt => {
			return (
				<tr key={savingInt._id}>
					<td>{savingInt.date}</td>
					<td>{savingInt.amount}</td>
					
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


	useEffect(() => {
		fetchData();
	}, [fetchData])


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
								<th>Payment Status</th>
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
				{/*Edit Modal Forms*/}
				<Modal show={showEdit} onHide={closeEdit}>
						<Modal.Header closeButton>
							<Modal.Title>Payment Schedules</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Table striped bordered hover responsive>
								<thead className="bg-dark text-white">
							<tr>
								<th colSpan='2'>Date</th>
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

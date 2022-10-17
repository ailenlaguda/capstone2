import React, { useState, useEffect, useCallback } from 'react';
import { Table, Row, Container, Col } from 'react-bootstrap';


export default function UserSharedCapital() {

	const [savings, setSavings] = useState([])
	const [savingsData, setSavingsData] =  useState([])
	const [savingsInterestData, setsavingsInterestData] =  useState([])
	const [savingsInterests, setsavingsInterest] =  useState([])

	

	
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
				
				setSavings(data.sharedCapital)
				setsavingsInterestData(data.sharedCapitalInterests)	
				
				const savingsArr = savings.map(saving => {
					return (
						<tr key={saving._id}>
							<td>{saving.date}</td>
							<td>{saving.amount}</td>
						</tr>
					)
					})

				setSavingsData(savingsArr)	


				const savingsInterestArr = savingsInterestData.map(savingInt => {
					return (
						<tr key={savingInt._id}>
							<td>{savingInt.date}</td>
							<td>{savingInt.amount}</td>
						</tr>
					)
					})

				setsavingsInterest(savingsInterestArr)	
			})

		}

	useEffect(() => {
		fetchData();
	}, [fetchData])


	return(
		<>
		<Container>
			<Row>
				<Col xs={12} md={6}>
					<div className="text-center my-4">
						<h1> Shared Capital Transactions</h1>
					</div>
					<Table striped bordered hover responsive>
						<thead className="bg-dark text-white">
							<tr>
								<th>Date</th>
								<th>Amount</th>
								{/*<th>Description</th>
								<th>Price</th>
								<th>Availability</th>
								<th colSpan='2'>Actions</th>*/}
							</tr>
						</thead>

						<tbody>
							{savingsData}
						</tbody>
					</Table>
				</Col>
				<Col xs={12} md={6}>
					<div className="text-center my-4">
						<h1> Shared Capital Interests</h1>
						{/*<AddCourse fetchData={fetchData}/>*/}
					</div>
					<Table striped bordered hover responsive>
						<thead className="bg-dark text-white">
					<tr>
						<th>Date</th>
						<th>Amount</th>
						{/*<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th colSpan='2'>Actions</th>*/}
					</tr>
						</thead>

						<tbody>
							{savingsInterests}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>

			
			
		</>

		)
}

import React, { useState, useEffect,useRef } from 'react';
import { Table, Row, Container, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { faPrint } from '@fortawesome/free-solid-svg-icons';
	import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Page, Text, View, Document, Image, PDFViewer  } from '@react-pdf/renderer';

export default function UserSavings() {
	 const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
	const navigate = useNavigate();
	const [savings, setSavings] = useState([])
	const [savingsData, setSavingsData] =  useState([])
	const [currTotalSavings, setCurrTotalSavings] = useState('')
	
	
		const fetchData = () => {
		// fetch('https://laguda-grocery-store-ol-shop.herokuapp.com/orders/all-auth-orders',{
			fetch(`https://bnhscoopbackend.herokuapp.com/savings/indivdualSavingsRecord/${localStorage.getItem('id')}`,{
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

				setSavings(data)

				if (savings.length > 0) {
				  const sortedSavings = savings.sort((a, b) => new Date(b.date) - new Date(a.date));
				  const lastTotalSavings = sortedSavings[0];
				  setCurrTotalSavings(lastTotalSavings.currTotalSavings);
				}
				

				const savingsArr = savings.map(saving => {
					return (
						<tr key={saving._id}>
							<td>{formatDate(saving.date)}</td>
							<td>{`₱${dollarUSLocale.format(saving.amount)}`}</td>
							<td>{saving.description}</td>
							<td>{saving.transType}</td>
						</tr>
					)
					})

				setSavingsData(savingsArr)					
			})

		}

	useEffect(() => {
		fetchData();
	}, [fetchData])

	function formatDate(isoDate) {
	  const dateObj = new Date(isoDate);
	  const year = dateObj.getFullYear();
	  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // add 1 to month since it's zero-based, and pad with zero if necessary
	  const day = dateObj.getDate().toString().padStart(2, '0'); // pad with zero if necessary
	  const formattedDate = `${year}-${month}-${day}`;
	  return formattedDate;
	}

	const navToDashboard = () =>{
		navigate("/myAccount")
	}
let dollarUSLocale = Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });

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
		 <Container ref={componentRef}>
			<Row >
				<div className="text-center my-4">
            <img src="bnhs_logo.png" alt="School Logo" />
            <h2>Bentuco National High School Faculty Cooperative</h2>
            <h3>Bentuco, Gubat, Sorsogon</h3>
            <h4> Loans & Savings Management System</h4>
            <h4>Shared Capital Transactions</h4>
        </div>
				<Col xs={12} md={12} className="print-content">
					 <div> 
			            <h5>{lastName}, {firstName} {middleName} </h5>
			            <h5>{position} </h5>
			            <h5>Total Current Balance: {`₱${dollarUSLocale.format(currTotalSavings)}`} </h5>
			          </div>
					<Table striped bordered hover responsive>
						<thead className="bg-dark text-white">
							<tr>
								<th>Date</th>
								<th>Amount</th>
								<th>Description</th>
								<th>Transaction Type</th>
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
			</Row>
	</Container>
			<Button title="Print Transactions" onClick={handlePrint}><FontAwesomeIcon icon={faPrint} /></Button>
			<Button  className = "print-button my-3 mx-1" variant="secondary" onClick={()=>navToDashboard()} >Back to Account</Button>

	</>
		)
}

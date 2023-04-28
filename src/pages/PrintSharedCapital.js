import React, { useState, useEffect } from 'react';
import { Table, Row, Container, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function PrintSharedCapital() {
	const navigate = useNavigate();

const [startDate, setStartDate] = useState(null);
const [savings, setSavings] = useState([]);
const [savingsData, setSavingsData] =  useState([]);
const [savingsInterests, setsavingsInterest] =  useState([]);
const [currTotalSavings, setCurrTotalSavings] = useState('');
const [dateFrom, setDateFrom] = useState(new Date());
const [dateTo, setDateTo] = useState(new Date());



const fetchData = () => {
  const from = new Date(dateFrom).setHours(0, 0, 0, 0);
  const to = new Date(dateTo).setHours(0, 0, 0, 0);

  fetch(`https://bnhscoopbackend.herokuapp.com/sharedCapitals/indivdualSavingsRecord/${localStorage.getItem('printId')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      Accept: 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
  	console.log(data)
    setSavings(data);

    if (savings.length > 0) {
      const lastTotalSavings = savings[0];
      setCurrTotalSavings(lastTotalSavings.currTotalSharedCapital);
    }
    
    const filteredData = savings.filter(saving => {
      const savingDate = new Date(saving.date).setHours(0, 0, 0, 0);
      return savingDate >= from && savingDate <= to;
    });

    console.log(filteredData);

    const savingsArr = filteredData.map(saving => {
      return (
        <tr key={saving._id}>
          <td>{formatDate(saving.date)}</td>
          <td>{`₱${dollarUSLocale.format(saving.amount)}`}</td>
          <td>{saving.description}</td>
          <td>{saving.transType}</td>
        </tr>
      )
    })

    setSavingsData(savingsArr);
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

  	let dollarUSLocale = Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });

  	const print = () => {
 
			  // Print the page
			  window.print();

    }

    const navToDashboard = () =>{
		navigate("/AdminDashboard")
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
		<Container>
			<Row>
					<div className="text-center my-4">
						<h1>Print Shared Capital Transactions</h1>
					</div>
				<Col xs={12} md={3}>
					<div>
						From: <DatePicker
							  selected={dateFrom}
							  onChange={(date) => setDateFrom(date)}
							  dateFormat="MM/dd/yyyy"
							/>
					</div>
					<div>
						To: <DatePicker
							  selected={dateTo}
							  onChange={(date) => setDateTo(date)}
							  dateFormat="MM/dd/yyyy"
							/>
					</div>
				</Col>
				<Col xs={12} md={3}>
					
						<h5>{lastName}, {firstName} {middleName} </h5>
						<h5>{position} </h5>
						<h5>Total Current Balance: {`₱${dollarUSLocale.format(currTotalSavings)}`} </h5>
				</Col>
			</Row>
			<br />
			<Row>
				<Col xs={12} md={6}>
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
			 <Button className="no-print" title="Print Transactions" onClick={() => print()}><FontAwesomeIcon icon={faPrint} /></Button>
			 <Button  className = "no-print my-3 mx-1" variant="secondary" onClick={()=>navToDashboard()} >Back to Dashboard.</Button>
		</Container>	
			
		</>

		)
}

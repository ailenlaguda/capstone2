import React, { useState, useEffect } from 'react';
import { Table, Row, Container, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
	
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from "react-router-dom";

export default function PrintSavings() {
const navigate = useNavigate();

const [savings, setSavings] = useState([]);
const [savingsData, setSavingsData] =  useState([]);
const [currTotalSavings, setCurrTotalSavings] = useState('');
const [dateFrom, setDateFrom] = useState(new Date());
const [dateTo, setDateTo] = useState(new Date());

const fetchData = () => {
  const from = new Date(dateFrom).setHours(0, 0, 0, 0);
  const to = new Date(dateTo).setHours(0, 0, 0, 0);

  fetch(`https://bnhscoopbackend.herokuapp.com/savings/indivdualSavingsRecord/${localStorage.getItem('printId')}`, {
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
      setCurrTotalSavings(lastTotalSavings.currTotalSavings);
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

  	let dollarUSLocale = Intl.NumberFormat('en-US');

  	const print = () => {
        window.print()
    }

     const navToDashboard = () =>{
		navigate("/AdminDashboard")
	}
	return(
		<>
		<Container>
			<Row>
				<Col xs={12} md={6}>
					<div className="text-center my-4">
						<h1>Prints Savings Transactions</h1>
					</div>
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
						<h3>Total Current Balance: {`₱${dollarUSLocale.format(currTotalSavings)}`} </h3>
				</Col>
			</Row>
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
			 <Button title="Print Transactions" onClick={() => print()}><FontAwesomeIcon icon={faPrint} /></Button>
			 <Button  className = "my-3 mx-1" variant="secondary" onClick={()=>navToDashboard()} >Back to Dashboard.</Button>
		</Container>	
			
		</>

		)
}

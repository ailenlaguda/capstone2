
import React, { useState, useEffect } from 'react';
import { Table, Row, Container, Col, Button } from 'react-bootstrap';
import ResetPassword from '../components/ResetPassword';
import DeleteUser from '../components/DeleteUser';
import AddSavingsPayment from '../components/AddSavingsPayment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function LoanSummary({lastName, firstName, userId}) {

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

	const [showModal, setShowLoanModal] = useState(false)

	const fetchData = () => {
	  fetch(`http://localhost:4000/loans/retrieveLoanAllLoan/`, {
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
	      	  const loanArr = data.length > 0 ? data.map((loan) => (
			   
			   return( <tr key={loan._id}>
			        <td>{loan.date}</td>
			        <td>{loan.currBalance}</td>
			        <td>{loan.principalAmount}</td>
			        <td>{loan.term}</td>
			        <td>{loan.description}</td>
			        <td>{loan.transType}</td>
			        <td>{loan.paymentSchedules}</td>
			        <td>
			            <button onClick={() => {
			                setDate(loan.date);
			                setcurrLoanBalance(loan.currBalance);
			                setPrincipalAmount(loan.principalAmount);
			                setInterest(loan.interest);
			                setTerm(loan.term);
			                setIsActive(loan.isActive);
			                setDescription(loan.description);
			                setTransType(loan.transType);
			                setPaymentSchedules(loan.paymentSchedules);
			                setShowLoanModal(true);
			            }}>
			                View Loan
			            </button>
			        </td>
			    </tr>
			    )
			)) : null;
	      }
	    })
	    .catch(err => {
	      console.error('Error fetching data:', err);
	    });
	}


	const LoanModal = ({
		    showModal,
		    closeModal,
		    userId,
		    date,
		    currLoanBalance,
		    principalAmount,
		    interest,
		    term,
		    isActive,
		    description,
		    transType,
		    paymentSchedules,
		    onPayDue
		}) => {
		    const [paymentAmount, setPaymentAmount] = useState(0);

		    const handlePayment = (e) => {
		        e.preventDefault();
		        onPayDue(paymentAmount);
		    }

		    if (!showModal) {
		        return null;
		    }

		    return (
		        <div className="modal">
		            <div className="modal-content">
		                <h2>Loan Details</h2>
		                <p><strong>User ID:</strong> {userId}</p>
		                <p><strong>Date:</strong> {date}</p>
		                <p><strong>Current Loan Balance:</strong> {currLoanBalance}</p>
		                <p><strong>Principal Amount:</strong> {principalAmount}</p>
		                <p><strong>Interest:</strong> {interest}</p>
		                <p><strong>Term:</strong> {term}</p>
		                <p><strong>Is Active:</strong> {isActive}</p>
		                <p><strong>Description:</strong> {description}</p>
		                <p><strong>Transaction Type:</strong> {transType}</p>
		                <h3>Payment Schedule</h3>
		                <table>
		                    <thead>
		                        <tr>
		                            <th>Due Date</th>
		                            <th>Amount</th>
		                            <th>Action</th>
		                        </tr>
		                    </thead>
		                    <tbody>
		                        {paymentSchedules.map((schedule) => (
		                            <tr key={schedule.dueDate}>
		                                <td>{schedule.dueDate}</td>
		                                <td>{schedule.amount}</td>
		                                <td>
		                                    <button onClick={() => onPayDue(schedule.amount)}>Pay Due</button>
		                                </td>
		                            </tr>
		                        ))}
		                    </tbody>
		                </table>
		                <h3>Make a Payment</h3>
		                <form onSubmit={handlePayment}>
		                    <label>
		                        Payment Amount:
		                        <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
		                    </label>
		                    <button type="submit">Submit Payment</button>
		                </form>
		            </div>
		        </div>
			    )
			}
}

// 	useEffect(() => {
// 		fetchData();
// 	}, [fetchData]);

// 	return(
// 		<>
// 			<Container>
// 				<Row>
// 					<Col xs={6} md={12}>
// 						<div className="text-center my-4">
// 							<h1> Manage users <FontAwesomeIcon icon={faUserEdit} /></h1>
// 						</div>
// 							<h2><Button title="Click to Add User"><FontAwesomeIcon icon={faUserPlus} /></Button></h2>
// 						<Table striped bordered hover responsive>
// 							<thead className="bg-dark text-white">
// 								<tr>
// 									<th>Employee No.</th>
// 									{/*<th>E-mail</th>*/}
// 									<th>First Name</th>
// 									<th>Middle Name</th>
// 									<th>Last Name</th>
// 								{/*	<th>TIN</th>
// 									<th>CP No.</th>
// 									<th>Position</th>
// 									<th>Sex</th>
// 								*/}	<th colSpan="2" style={{textAlign: 'center'}}>Accounts Actions</th>
// 									<th colSpan="4" style={{textAlign: 'center'}}>Manage User</th>

// 								</tr>
// 							</thead>

// 							<tbody>
// 								{loanData}
// 							</tbody>
// 						</Table>
// 					</Col>
					
// 				</Row>
// 			</Container>
// 		</>
// 	)
// }

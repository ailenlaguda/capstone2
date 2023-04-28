import React, {useState, useEffect, useContext} from 'react';
import	{Row, Col, Card, Container} from "react-bootstrap";
import Banner from '../components/Banner'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt,faMoneyBillWaveAlt, faHandHoldingUsd, faFileContract, faUserCircle  } from '@fortawesome/free-solid-svg-icons';
import {Navigate} from 'react-router-dom';
// import UserLoans from from '../components/UserLoans';
// import UserSavings from '../components/UserSavings'
// import UserProfiles from from '../components/UserProfiles';
import UserContext from '../UserContext';

export default function MyAccount(){
	
	const {user} = useContext(UserContext);
	// const { user } = useContext (UserContext)
	// const [allProductsMenu, setProductsMenu] = useState([]);
	const [currTotalSavings, setCurrTotalSavings] = useState('')
	const [currTotalSharedCapital, setcurrTotalSharedCapital] = useState('')
	const [dueDate, setDueDate] = useState(new Date());
	const [amount, setAmount] = useState('');
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [position, setPosition] = useState('');
	const [totalLoans, setTotalLoans] = useState('');
	const [savingAll, setSavingsAll] = useState('');
	const [sharedCapitalAll, setSharedCapitalAll] = useState('');
	const [inactiveLoanCount, setInactiveLoanCount] = useState('');
	const [loanPendingCount, setLoanPendingCount] = useState('');
	

	const fetchDataOrder = () => {
		
		// fetch('https://laguda-grocery-store-ol-shop.herokuapp.com/orders/all-auth-orders',{
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

	}

	

	const loans = () => {
		fetch(`https://bnhscoopbackend.herokuapp.com/loans/loanRecord/${localStorage.getItem('id')}`,{
		// fetch(`http://localhost/users/oneRecord/${user._id}`,{
			method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					 'Accept': 'application/json'
				}
		})
		.then(res=> res.json())
		.then (result => {

			if (result.message !== "No records found"){

				console.log(result)
				setTotalLoans(Number.parseFloat(result.currLoanBalance).toFixed(2))
				// dueDate=result.paymentsSchedules[0].date
				// setDueDate(result.paymentsSchedules[0].date)
				setAmount(result.paymentSchedules[0].amount)
				setDueDate(result.paymentSchedules[0].date)
			}

		})
	}
	


	fetch(`https://bnhscoopbackend.herokuapp.com/loans/retrieveLoanAllLoan/${localStorage.getItem('id')}`,{
		method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				 'Accept': 'application/json'
			}
	})
	.then(res=> res.json())
	.then (result => {


		 const inactiveLoans = result.filter(loan => !loan.isActive);
		// Count the number of inactive loans
		const inactiveLoanCount = inactiveLoans.length;
		const pending = result.filter(pending =>pending.applicationStatus=="Pending")
		const pendingCount =pending.length
		setInactiveLoanCount(inactiveLoanCount);
		setLoanPendingCount(pendingCount)

	})
	.catch(error => {
  	console.error(error);
});
	


	
// savings fetching current balance
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

		setSavingsAll(data)

		if (savingAll.length > 0) {
		  const sortedSavings = savingAll.sort((a, b) => new Date(b.date) - new Date(a.date));
		  const lastTotalSavings = sortedSavings[0];
		  setCurrTotalSavings(lastTotalSavings.currTotalSavings);
		}
	})
	
	// savings fetching current shared capital totals
	fetch(`https://bnhscoopbackend.herokuapp.com/sharedCapitals/indivdualSavingsRecord/${localStorage.getItem('id')}`,{
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

		setSharedCapitalAll(data)

		if (sharedCapitalAll.length > 0) {
		  const sortedSavings = sharedCapitalAll.sort((a, b) => new Date(b.date) - new Date(a.date));
		  const lastTotalSavings = sortedSavings[0];
		  setcurrTotalSharedCapital(lastTotalSavings.currTotalSharedCapital);
		}
	})

	function formatDate(isoDate) {
	  const dateObj = new Date(isoDate);
	  const year = dateObj.getFullYear();
	  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // add 1 to month since it's zero-based, and pad with zero if necessary
	  const day = dateObj.getDate().toString().padStart(2, '0'); // pad with zero if necessary
	  const formattedDate = `${year}-${month}-${day}`;
	  return formattedDate;
	}
	let dollarUSLocale = Intl.NumberFormat('en-US', { minimumFractionDigits: 2 });
	// let dateLocale = new Intl.DateTimeFormat('en-US' /*, o*/)

	useEffect(()=> {
		fetchDataOrder();
		loans();
	}, [])


	return (
		(user.accessToken === null) ?
					
			<Navigate to="/" />
		:

		<Container>
			<Row><Banner/></Row>
			<Row>
				<Col xs={12} md={4}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>Savings <FontAwesomeIcon icon={faMoneyBillAlt} /></h2>
							</Card.Title>
							<Card.Text>
								Total Savings: <b>&#8369;{dollarUSLocale.format(currTotalSavings)}</b>
								<br/>
								<br/>
								<br/>
								<br/> View transactions <Link to={'/userSavings'}>here.</Link>
					
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} md={4}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>Shared Capital <FontAwesomeIcon icon={faHandHoldingUsd} /><i className="fas fa-hand-holding-usd"></i></h2>
							</Card.Title>
							<Card.Text>
								Total Shared Capital: <b>&#8369;{dollarUSLocale.format(currTotalSharedCapital)}</b>
								<br />
								<br/>
								<br/>
								<br />View transactions <Link to={'/userSharedCapital'}>here.</Link>

							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={4}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>Active Loan <FontAwesomeIcon icon={faMoneyBillWaveAlt} /></h2>
							</Card.Title>
							<Card.Text>
								Loan Balance:  <b>&#8369;{isNaN(totalLoans)? "No Active Loan":dollarUSLocale.format(totalLoans)}</b>
								<br />Monthly Amortization: <b>&#8369;{dollarUSLocale.format(amount)}</b>
								 <br/>Upcoming Due Date: {amount===0 ? <b>{formatDate(dueDate)}</b>: "No Loan Record"}
								<br /> View transactions <b><Link to={'/userLoan'}>here.</Link></b>
								<br />Apply for a new loan<b> <Link to={'/LoanCalculator'}>here.</Link></b>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

			</Row>
			<Row>
				
				<Col xs={12} md={4}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>Loan Application <FontAwesomeIcon icon={faFileContract} /> </h2>
							</Card.Title>
							<Card.Text>
								<br/>
								<p>Current Loan Application: {loanPendingCount}
								<br/>Number of Inactive Loans: {inactiveLoanCount}</p>

							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={4}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>My Profile <FontAwesomeIcon icon={faUserCircle} /></h2>
							</Card.Title>
							<Card.Text>
								Full Name: <b> {lastName}, {firstName} {middleName}</b>
								<p>Postion: <b>{position}</b>
								<br /> Edit your profile <b><Link to={'/userProfile'}>here.</Link></b></p>

							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)

}
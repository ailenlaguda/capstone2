import React, {useState, useEffect, useContext} from 'react';
import	{Row, Col, Card, Container} from "react-bootstrap";
import Banner from '../components/Banner'
import {Link} from 'react-router-dom';

// import UserLoans from from '../components/UserLoans';
// import UserSavings from '../components/UserSavings'
// import UserProfiles from from '../components/UserProfiles';
import UserContext from '../UserContext';

export default function MyAccount(){
	
	const {user} = useContext(UserContext);
	// const { user } = useContext (UserContext)
	// const [allProductsMenu, setProductsMenu] = useState([]);
	const [usersData, setUserData] = useState([]);
	const [totalSavings, setTotalSavings] = useState([]);
	const [totalLoans, setTotalLoans] = useState([]);
	const [dueDate, setDueDate] = useState(Date);
	const [amount, setAmount] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [position, setPosition] = useState('');
	const [sharedCapital, setSharedCapital] = useState('');
	

	const fetchDataOrder = () => {
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
			setUserData(data)
			setTotalSavings(Number.parseFloat(data.totalSavings).toFixed(2))
			setFirstName(data.firstName)
			setLastName(data.lastName)
			setPosition(data.position)
			setSharedCapital(data.totalSharedCapital)
		})

	}

	

	const loans = () => {
		fetch(`http://localhost:4000/loans/loanRecord/${localStorage.getItem('email')}`,{
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
			
			setUserData(result)
			setTotalLoans(Number.parseFloat(result.outBalance).toFixed(2))
			// dueDate=result.paymentsSchedules[0].date
			// setDueDate(result.paymentsSchedules[0].date)
			setAmount(result.paymentsSchedules[0].amount)
			setDueDate(result.paymentsSchedules[0].date)
			
		})
	}

	let dollarUSLocale = Intl.NumberFormat('en-US');
	// let dateLocale = new Intl.DateTimeFormat('en-US' /*, o*/)

	useEffect(()=> {
		fetchDataOrder();
		loans();
	}, [])


	return (
		<Container>
			<Row><Banner/></Row>
			<Row>
				<Col xs={12} md={4}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>Savings</h2>
							</Card.Title>
							<Card.Text>
								Total Savings: Your total savings is <b>&#8369;{dollarUSLocale.format(totalSavings)}</b>
								<p></p>
								<br/>
								<br/>
								<p> View transactions <Link to={'/userSavings'}>here.</Link></p>
					
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} md={4}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>Loans</h2>
							</Card.Title>
							<Card.Text>
								Loan Balance: <b>&#8369;{dollarUSLocale.format(totalLoans)}</b>
								<p>Amount Due: {dollarUSLocale.format(amount)}</p>
								 Due Date: {dueDate}
								<p> View transactions <Link to={'/userSavings'}>here.</Link></p>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} md={4}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>Shared Capital</h2>
							</Card.Title>
							<Card.Text>
								Total Shared Capital: <b>&#8369;{dollarUSLocale.format(sharedCapital)}</b>
								<p></p>
								<br/>
								<br/>
								<p> View transactions <Link to={'/userSharedCapital'}>here.</Link></p>

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
								<h2>My Profile</h2>
							</Card.Title>
							<Card.Text>
								Full Name: <b> {lastName}, {firstName}</b>
								<p>Postion: {position}</p>
								<br/>
								<p> Edit your profile <Link to={'/register'}>here.</Link></p>

							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={12} md={4}>
					<Card className="card-highlight p-3 mt-3">
						<Card.Body>
							<Card.Title>
								<h2>Special Loan</h2>
							</Card.Title>
							<Card.Text>
								<p>SOON....</p>
								Loan Balance: <b>&#8369;{dollarUSLocale.format(totalLoans)}</b>
								<p>Amount Due: {dollarUSLocale.format(amount)}</p>
								 Due Date: {dueDate}
								{/*<p> View transactions <Link to={'/userSavings'}>here.</Link></p>*/}

							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)

}
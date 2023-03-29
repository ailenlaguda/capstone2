import { useState, useEffect, useCallback} from 'react';
import { Table, Row, Container, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank  } from '@fortawesome/free-solid-svg-icons';

export default function UserSavingsForAdmin({email, fetchData}) {

	const [savings, setSavings] = useState([])
	const [savingsData, setSavingsData] =  useState([])
	const [savingsInterestData, setSavingsInterestData] =  useState([])
	const [savingsInterests, setsavingsInterest] =  useState([])

	//state for editCourse Modals to open/close
	const [showEdit, setShowEdit] = useState(false)

	const UserSavingsForAdmin = (email) => {
	  fetch(`https://bnhscoopbackend.herokuapp.com/users/savingsRecordsForAdmin/${email}`, {
	    method: 'GET',
	    headers: {
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	      Accept: 'application/json',
	    },
	  })
	    .then((res) => res.json())
	    .then((data) => {
	    	
	      setSavings(data.savings);
	      setSavingsInterestData(data.savingsInterests);

	     const savingsData = data.savings && data.savings.length > 0 ? data.savings.map((saving) => (
		  <tr key={saving._id}>
		    <td>{saving.date}</td>
		    <td>{saving.amount}</td>
		  </tr>
		)) : null;

	      setSavingsData(savingsData);

	     const savingsInterestData = data.savingsInterests && data.savingsInterests.length > 0
		  ? data.savingsInterests.map((savingInt) => (
		      <tr key={savingInt._id}>
		        <td>{savingInt.date}</td>
		        <td>{savingInt.amount}</td>
		      </tr>
		    ))
		  : null;

		setsavingsInterest(savingsInterestData);

	    });
	};

	useEffect(() => {
		fetchData();
	}, [fetchData])


	const closeEdit = () => {
		setShowEdit(false);

	}

	const openSavings = () =>{
		setShowEdit(true);
		  UserSavingsForAdmin(email);
	}

	return(
		<>

		<Button className="btnSave" variant="primary" size="sm" onClick={() => {
		    openSavings();
		  
		}} title="Click to view user's savings">
		    <FontAwesomeIcon icon={faPiggyBank} />
		</Button>

		<Modal show={showEdit} onHide={closeEdit}>
				<Modal.Header closeButton>
					<Modal.Title>View Members' Savings</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col xs={12} md={6}>
								<div className="text-center my-4">
									<h1> Savings Transactions</h1>
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
									<h1> Savings Interests</h1>
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
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={closeEdit}>Close</Button>
				</Modal.Footer>			
			</Modal>
			
		</>
	)
}
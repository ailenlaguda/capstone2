import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Table, Row, Container, Col,Form } from 'react-bootstrap';
import ResetPassword from '../components/ResetPassword';
import DeleteUser from '../components/DeleteUser';
import LoanSummary from '../components/LoanSummary';
import AddSavingsPayment from '../components/AddSavingsPayment';
import SharedCapital from '../components/SharedCapital';
import ApproveAllPending from '../components/ApproveAllPending';
import RegisterAdmin from '../components/RegisterAdmin';
import ApproveUsers from '../components/ApproveUsers';
import Print from '../components/Print';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

export default function AdminDashboard() {


	const {user} = useContext(UserContext);

	const [usersData, setusersData] = useState([]);
	const [initialLoad, setInitialLoad] = useState(true)


	 const fetchData = useCallback(async () => {
		    try {
		      const response = await fetch(
		        `https://bnhscoopbackend.herokuapp.com/users/allRecords`,
		        {
		          method: "GET",
		          headers: {
		            "Content-Type": "application/json",
		            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		            Accept: "application/json",
		          },
		        }
		      );

		      const data = await response.json();

		      if (Array.isArray(data)) {
		        const savingsArr = data.map((saving) => (
		          <tr key={saving._id}>
		            <td>{saving._id}</td>
		            {/*<td>{saving.email}</td>*/}
		            <td>{saving.firstName}</td>
		            <td>{saving.middleName}</td>
		            <td>{saving.lastName}</td>
		            <td>{saving.cp}</td>
		            <td>{saving.position}</td>
		            {/*<td>{saving.tin}</td>
		            <td>{saving.sex}</td>*/}
		            <td>
		              <AddSavingsPayment userId={saving._id} activeStatus={saving.activeStatus} fetchData={fetchData} />
		            </td>
		            <td>
		              <SharedCapital userId={saving._id} activeStatus={saving.activeStatus} fetchData={fetchData} />
		            </td>
		            <td>
		              <LoanSummary
			              activeStatus={saving.activeStatus}
		                lastName={saving.lastName}
		                firstName={saving.firstName}
		                loan={saving._id}
		                fetchData={fetchData}
		              />
		            </td>
		            <td>
		              <ResetPassword email={saving.email} activeStatus={saving.activeStatus} fetchData={fetchData} />
		            </td>
		            <td>
		              <DeleteUser email={saving.email} fetchData={fetchData} />
		            </td>
		          </tr>
		        ));
		        setusersData(data);
		        setFilteredUsersData1(savingsArr);
		      }
		    } catch (error) {
		      console.error("Error fetching data:", error);
		    }
		  }, []);

		  useEffect(() => {
		    fetchData();
		  }, [fetchData]);

	const [filteredUsersData, setFilteredUsersData] = useState([]);
	const [filteredUsersData1, setFilteredUsersData1] = useState([]);
	const [searchText, setSearchText] = useState('')
	const [selectedValue, setSelectedValue] = useState('')

	const handleSearchTextChange = (event) => {
	  
	  const searchText = event.target.value;
	  setSearchText(searchText);
	  setInitialLoad(false)
	  const filteredData = usersData.filter(saving => {
		  const userString = `${saving._id} ${saving.firstName} ${saving.middleName} ${saving.lastName} ${saving.cp} ${saving.position}`;
		  return userString.toLowerCase().includes(searchText.toLowerCase());
		});


	  // console.log(filteredData)
	  const savingsArr = filteredData.map(saving => (
          <tr key={saving._id}>
            <td>{saving._id}</td>
            {/*<td>{saving.email}</td>*/}
            <td>{saving.firstName}</td>
            <td>{saving.middleName}</td>
            <td>{saving.lastName}</td>
            <td>{saving.cp}</td>
            <td>{saving.position}</td>
            {/*<td>{saving.tin}</td>
            <td>{saving.sex}</td>*/}
            <td><AddSavingsPayment userId={saving._id} activeStatus={saving.activeStatus} fetchData={fetchData}/></td> 
            <td><SharedCapital userId={saving._id} activeStatus={saving.activeStatus} fetchData={fetchData}/></td>
            <td><LoanSummary lastName={saving.lastName} firstName={saving.firstName} activeStatus={saving.activeStatus} loan={saving._id} fetchData={fetchData}/></td>
            <td><ResetPassword email={saving.email} activeStatus={saving.activeStatus} fetchData={fetchData}/></td>
            <td><DeleteUser email={saving.email} fetchData={fetchData}/></td>
          </tr>
	 	));

	  setFilteredUsersData(savingsArr);
	};

	const handleInactive = (event) => {
	  const selectedValue = event.target.value;
	  setSelectedValue(selectedValue);
	  setInitialLoad(false);

	  const filteredData = usersData.filter(saving => {
	    switch (selectedValue) {
	      case 'active':
	        return saving.activeStatus === true;
	      case 'inactive':
	        return saving.activeStatus === false;
	      default:
	        return true;
	    }
	  });

	  const savingsArr = filteredData.map(saving => (
	    <tr key={saving._id}>
	      <td>{saving._id}</td>
	      {/*<td>{saving.email}</td>*/}
	      <td>{saving.firstName}</td>
	      <td>{saving.middleName}</td>
	      <td>{saving.lastName}</td>
	      <td>{saving.cp}</td>
	      <td>{saving.position}</td>
	      {/*<td>{saving.tin}</td>
	      <td>{saving.sex}</td>*/}
	      <td><AddSavingsPayment userId={saving._id} activeStatus={saving.activeStatus} fetchData={fetchData}/></td> 
	      <td><SharedCapital userId={saving._id} activeStatus={saving.activeStatus} fetchData={fetchData}/></td>
	      <td><LoanSummary lastName={saving.lastName} firstName={saving.firstName} activeStatus={saving.activeStatus} loan={saving._id} fetchData={fetchData}/></td>
	      <td><ResetPassword email={saving.email} activeStatus={saving.activeStatus} fetchData={fetchData}/></td>
	      <td><DeleteUser email={saving.email} fetchData={fetchData}/></td>
	    </tr>
	  ));

	  setFilteredUsersData(savingsArr);
};


	return(
		(user.userType === "Member") ?
						
			<Navigate to="/" />
		:
		<>
			<Container>
				<Row>
					<Col xs={6} md={12}>
						<div className="text-center my-4">
							<h1> Manage users <FontAwesomeIcon icon={faUserEdit} /></h1>
						</div>
							<Row>
								<Col xs={12} md={3}>
									<h2><RegisterAdmin /> <Print /> <ApproveAllPending fetchData={fetchData}/> <ApproveUsers fetchData={fetchData}/>
									</h2>
								</Col>
								<Col xs={12} md={5}>
								</Col>
								<Col xs={12} md={2}>
								  <Form.Group>
								    <Form.Control type="text" value={searchText} placeholder="Filter the list" onChange={handleSearchTextChange} required/>
								  </Form.Group>
								</Col>
								<Col xs={12} md={2}>
									<Form.Group>
										<Form.Control
											as="select"	 
											required
											value={selectedValue}
											placeholder="Filter the list"
											onChange={handleInactive}>		
										  <option>Select here</option>
										  <option value="active">Active</option>
										  <option value="inactive">Inactive</option>
										  
										</Form.Control>
									</Form.Group>  
								</Col>
								{/*<Col xs={12} md={1}>
									<Button><FontAwesomeIcon icon={faSearch} /></Button>
								</Col>*/}
							</Row>
{/*style={{ backgroundColor: "#101F60" }}*/}

						<Table striped bordered hover responsive>
							<thead style={{ backgroundColor: "#101F60", color: "white" }}>
								<tr>
									<th>Employee No.</th>
									{/*<th>E-mail</th>*/}
									<th>First Name</th>
									<th>Middle Name</th>
									<th>Last Name</th>
									<th>CP No.</th>
									<th>Position</th>
								{/*	<th>TIN</th>
									<th>Sex</th>
								*/}	<th colSpan="3" style={{textAlign: 'center'}}>Accounts Actions</th>
									<th colSpan="2" style={{textAlign: 'center'}}>User Actions</th>

								</tr>
							</thead>

							<tbody>
								{initialLoad ? filteredUsersData1 : filteredUsersData}
							</tbody>
						</Table>
					</Col>
					
				</Row>
			</Container>
		</>
	)
}

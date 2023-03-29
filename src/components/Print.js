import { Button, Modal, Form, Table } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


export default function Print() {
  
  const navigate = useNavigate();

  const handleButtonClick = (userID) => {
    localStorage.setItem('printId', userID)
    navigate('/PrintSavings');
    // navigate('/PrintSavings', { state: { userID: userID } });
  };

  const handleButtonClick1 = (userID) => {
     localStorage.setItem('printId', userID)
    navigate('/PrintSharedCapital');
  };
  
  const handleButtonClick2 = (userID) => {
     localStorage.setItem('printId', userID)
    navigate('/PrintUserLoans');
  };
  
  const [usersData, setUsersData]=useState([]); 
  const [userToPrint, setUserToPrint]=useState(''); 
  const [showEdit, setShowEdit] = useState(false)

  const closeEdit = () => {
    setShowEdit(false);
  }

  const openEdit = (event) => {
  fetch(`https://bnhscoopbackend.herokuapp.com/users/allRecords`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      Accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data !== null) {
        setUsersData(data);
        setShowEdit(true); // Move the setShowEdit call inside the if statement
      }
    });
};

const createPopolateUsers = useCallback(() => {
  return usersData.map(user => (
    <tr key={user._id}>
      <td>{user._id}</td>
      <td>{user.lastName}, {user.firstName} {user.middleName}</td>
      <td>
        <Button onClick={() => handleButtonClick(user._id)}>Savings</Button>
      </td>
      <td>
        <Button onClick={() => handleButtonClick1(user._id)}>CBU</Button>
      </td>
      <td>
        <Button onClick={() => handleButtonClick2(user._id)}>Loan</Button>
      </td>
    </tr>
  ));
}, [usersData]);

useEffect(() => {
  if (usersData !== null) {
    setUserToPrint(createPopolateUsers());
  }
}, [usersData, createPopolateUsers]);


  return (
    <>
      <Button title="Approve Pending Loans" onClick={() => openEdit()}><FontAwesomeIcon icon={faPrint} /></Button>

      {/*Edit Modal Forms*/}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Print Records</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Table striped bordered hover responsive>
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Employee #</th>
                    <th>Name</th>
                    <th colSpan = "3">Select Document To Print</th>
                    
                  </tr>
                </thead>

                <tbody>
                  {userToPrint}
                </tbody>
            </Table>    
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
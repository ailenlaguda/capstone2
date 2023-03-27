import { Button, Modal, Form, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

export default function Print({ id }) {
  
  const [usersData, setUsersData]=useState([]); 
  const [userToPrint, setUserToPrint]=useState(''); 
  const [showEdit, setShowEdit] = useState(false)

  const selectWhatToPrint = () => {
    const options = ['Savings Transactions', 'Shared Capital Transactions', 'Loan Record', "Logs"];
  }

  const closeEdit = () => {
    setShowEdit(false);
  }

  const openEdit=(event)=>{
    setShowEdit(true)

    fetch(`http://localhost:4000/users/allRecords`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Accept': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {

      if(data!==null){
        setUsersData(data)                
          const popolateUsers = usersData.map(user => (
            <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.lastName}, {user.firstName} {user.middleName} </td>                   
               <td>
                   <button>Savings</button> 
                   {/*<button onClick={(event) => handlePayment(user)}>Pay Due</button> */}
              </td>
              <td>
                  <button>Loan</button> 
                
              </td>
              <td>
                  <button>Log</button> 
              </td>
            </tr>
          ));
           setUserToPrint(popolateUsers)
      }
    });
  }


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
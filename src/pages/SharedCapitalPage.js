import React, { useState, useEffect } from 'react';
import { Table, Row, Container, Col } from 'react-bootstrap';


export default function SharedCapitalPage() {

  const [savings, setSavings] = useState([])
  const [savingsData, setSavingsData] =  useState([])
  const [savingsInterests, setsavingsInterest] =  useState([])
  const [currTotalSavings, setCurrTotalSavings] = useState('')
  

  
    const fetchData = () => {
    // fetch('https://laguda-grocery-store-ol-shop.herokuapp.com/orders/all-auth-orders',{
      fetch(`http://localhost:4000/sharedCapitals/indivdualSavingsRecord/${localStorage.getItem('id')}`,{
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

        if ( savings.length > 0) {
            const lastTotalSavings = savings[0];
            console.log(lastTotalSavings)
            setCurrTotalSavings(lastTotalSavings.currTotalSharedCapital );
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

    let dollarUSLocale = Intl.NumberFormat('en-US');


  return(
    <>
    <Container>
      <Row>
        <Col xs={12} md={12}>
          <div className="text-center my-4">
            <h1> Shared Capital Transactions</h1>
          </div>
          <div>
            <h3>Current Balance: {`₱${dollarUSLocale.format(currTotalSavings)}`}</h3>
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
      
    </>

    )
}

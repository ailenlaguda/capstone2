import React, { useState } from 'react';
import {Row, Form, Col, Button, Container} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCheckCircle, faCalculator  } from '@fortawesome/free-solid-svg-icons';

export default function LoanCalculator() {

    const [loanAmount, setLoanAmount] = useState(0);
       const [interestRate, setInterestRate] = useState(0);
       const [loanTerm, setLoanTerm] = useState(0);
       const [monthlyPayment, setMonthlyPayment] = useState(0);
       const [CBU, setCBU] = useState(0);
       const paymentSchedules = [{ amount: 0, date: new Date() }];
       const [isLoanActive,setIsLoanActive] = useState(false)
  // state to storage the values given by the user when filling the input fields
  const [userValues, setUserValues] = useState({
    amount: '',
    // interest: '',
    years: ''
  });

  // state to storage the results of the calculation
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    totalCBU: '',
    totalNetProceeds:'',
    isResult: false,
    paymentSched:[]
  });

  // state to storage error message
  const [error, setError] = useState('');

  // event handler to update state when the user enters values

  const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });


  // Manage validations and error messages
  const isValid = () => {
    const { amount, years } = userValues;
    let actualError = '';
    // Validate if there are values
    if (!amount || !years) {
      actualError = 'All the values are required';
    }
    // Validade if the values are numbers
    if (isNaN(amount) || isNaN(years)) {
      actualError = 'All the values must be a valid number';
    }
    // Validade if the values are positive numbers
    if (Number(amount) <= 0 || Number(years) <= 0) {
      actualError = 'All the values must be a positive number';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  const [isActive,setIsActive] = useState(true) 

  // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError('');
      calculateResults(userValues);
      console.log(userValues)
    }
  };

  // Calculation
  const calculateResults = ({ amount, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = userAmount * Number(years)/100;
    const calculatedPayments = parseFloat(years);
    const x = userAmount + calculatedInterest;
    const monthly = (x/calculatedPayments);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (calculatedInterest).toFixed(2);
      const totalCBUCalculated = (userAmount*0.03).toFixed(2);
      const totalNetProceedsCalculated = (userAmount - (totalCBUCalculated+20+10)).toFixed(2);
      // Set up results to the state to be displayed to the user
      
      setResults({

        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        totalCBU: totalCBUCalculated,
        totalNetProceeds: totalNetProceedsCalculated,
        isResult: true
        
      });
    }
    return  setIsActive(false);

  };


  // Clear input fields
  const clearFields = () => {
    setUserValues({
      amount: '',
      years: '',
    });

    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      totalCBU: '',
      totalNetProceeds:"",
      isResult: false
    });

    return setIsActive(true)
  };

  let dollarUSLocale = Intl.NumberFormat('en-US');
  
  const applyLoan = (e) => {
      // const paymentSchedules = [];
    
      fetch(`http://localhost:4000/loans/loanRecord/${localStorage.getItem('id')}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
             'Accept': 'application/json'
          }
      })
      .then (response =>response.json())
      .then(data=>{
          console.log(data)
        setIsLoanActive(data.isActive)
        
        if (isLoanActive || data.message === "No records found"){

          Swal.fire({
            title: 'Warning',
            icon: 'warning',
            text: 'Are you sure you want to submit loan application?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            }).then((result) => {

              if (result.isConfirmed) {
                 const now = new Date();
                 for (let i = 0; i < userValues.years; i++) {
                    const paymentDate = new Date(now.getFullYear(), now.getMonth() + i + 1, now.getDate());
                    paymentSchedules.push({
                      amount: results.monthlyPayment,
                      date: paymentDate
                    })
                  }

                  paymentSchedules.shift()
                  // e.preventDefault();


                 fetch('http://localhost:4000/loans/newLoan', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                       _id: localStorage.getItem('id'),
                       outBalance: userValues.amount,
                       principalAmount: userValues.amount,
                       interest: userValues.years,
                       term: userValues.years,
                       email: localStorage.getItem('email'),
                       paymentSchedules: paymentSchedules
                     })
                   
                   })  
                   .then(response => response.json())
                   .then(data => { 
                    // console.log(data)  
                     Swal.fire({
                       title: 'Good job!',
                       text: 'Loan Applied. Please wait for the confirmation!',
                       icon:'success'
                     })
                   });

                   paymentSchedules.length = 0
                }
              })
            clearFields()
        } else{
           Swal.fire({
                 title: 'Error!',
                 text: 'Sorry, you still have an active loan. If this is an error, contact administrator.',
                 icon:'error'
               })
           clearFields()
        } 
      })

     

  };

  return (
    <Container>
      <Row>
           {/*{!results.isResult ?   */}
        <Col xs={12} md={6} className="justify-content-center mt-3">
        <h1 className = "text-center">Apply for a Loan</h1>
            <Form onSubmit={(e)=>handleSubmitValues(e)}>
               <Form.Group>
                  <Form.Label>Loan Amount</Form.Label>
                  <Form.Control
                    type='number'
                    name='amount'
                    placeholder='Loan amount'
                    value={userValues.amount}
                    onBlur={(e) => setLoanAmount(dollarUSLocale.format(e.target.value))}
                    onChange={(e) => {
                      handleInputChange(e);
                      setUserValues({...userValues, amount: e.target.value});
                  }}
                />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Terms</Form.Label>
                  <Form.Select
                     type='text'
                     name='years'
                     placeholder='months to pay'
                     value={userValues.years}
                     onChange={(e) => {
                      handleInputChange(e);
                      setLoanTerm(e.target.value);
                    }}
                  >
                     <option></option>
                     <option value="3">3 Months</option>
                     <option value="6">6 Months</option>
                     <option value="9">9 Months</option>
                     <option value="12">12 Months</option>
                  </Form.Select>
                </Form.Group>
               <Button style={{ backgroundColor: '#FF66C4' }} type="submit" className = "my-3 mx-1" variant="primary" > <FontAwesomeIcon icon= {faCalculator}/> Calculate</Button>

                <h3 className = "text-center">Deductions</h3>
                <Form.Group>
                   <Form.Label>Service Fee</Form.Label>
                   <Form.Control
                       type="text"
                       value ="&#8369;20.00"
                       disabled
                   />
                </Form.Group>
                <Form.Group>
                   <Form.Label>Filing Fee</Form.Label>
                   <Form.Control
                       type="text"
                       value ="&#8369;10.00"
                       disabled
                   />
                </Form.Group>
                <Form.Group>
                   <Form.Label>Total Shared Capital</Form.Label>
                   <Form.Control
                       type="text"
                       value ={dollarUSLocale.format(results.totalCBU)} 
                       disabled
                   />
                </Form.Group>
          </Form>
        </Col>
          <Col xs={12} md={6} className="justify-content-center mt-3">      
            <Form>  
                
                <h1 className = "text-center">Loan Terms<br /></h1>
                <h4>
                  Loan amount: &#8369;{dollarUSLocale.format(userValues.amount)} <br /> Interest:{' '}
                  {userValues.years}% <br /> Months to repay: {userValues.years} <br /> Net Proceeds: &#8369;{dollarUSLocale.format(results.totalNetProceeds)} <br /> Monthly Payment: &#8369;{dollarUSLocale.format(results.monthlyPayment)}
                </h4>

                <Button style={{ backgroundColor: '#FF66C4' }}
                      className="my-3 mx-1"
                      onClick={clearFields}
                      disabled={isActive}
                    >
                      <FontAwesomeIcon icon={faCoffee} /> Recalculate
                    </Button>
                <Button  style={{ backgroundColor: '#FF66C4' }}
                    className = "my-3 mx-1"
                    onClick={() => applyLoan()}
                    title="Apply for loan"
                    disabled={isActive}> <FontAwesomeIcon icon={faCheckCircle } /> Apply</Button>
               
               <h3 className = "text-center">Totals</h3>
                <Form.Group>
                   <Form.Label>Total Interest</Form.Label>
                   <Form.Control
                       type="text"
                       value ={dollarUSLocale.format(results.totalInterest)} 
                       disabled
                       onChange={(e) => {
                        handleInputChange(e);
                        setInterestRate(e.target.value);
                    }}
                   />
                </Form.Group>
                <Form.Group>
                   <Form.Label>Total Payment</Form.Label>
                   <Form.Control
                       type="text"
                       value ={dollarUSLocale.format(results.totalPayment)} 
                       disabled
                   />
                </Form.Group>

            </Form>       
          </Col>
      </Row>
    </Container>
)
       

}
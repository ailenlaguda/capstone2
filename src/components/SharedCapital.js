import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

export default function SharedCapital({ userId, fetchData }) {
  
  const handleAddSharedCapital = (userId) => {
    const options = ['Credit', 'Debit'];

    Swal.fire({
      title: 'Enter amount and select an option',
      html:
        '<input id="amount" class="swal2-input" type="number" placeholder="Enter amount">' +
        '<select id="option" class="swal2-select">' +
        options.map((option) => `<option value="${option}">${option}</option>`).join('') +
        '</select>',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
      preConfirm: () => {
        const amount = Swal.getPopup().querySelector('#amount').value;
        const option = Swal.getPopup().querySelector('#option').value;
        if (!amount || !option) {
          Swal.showValidationMessage('Please enter both amount and select an option');
        }
        return { amount: amount, option: option };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let amount, description;
        const option = result.value.option;
        if (option === 'Debit') {
          amount = -1 * result.value.amount;
          description = 'Withdrawal';
        } else {
          amount = result.value.amount;
          description = 'Deposit';
        }

        fetch(`http://localhost:4000/sharedCapitals/newSavings/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 
          Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, 
          body: JSON.stringify({
            userID: userId,
            amount: amount,
            description: description,
            transType: option
          }),
        }).then((data) => {
          console.log(data)
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Savings Saved!',
          });
          fetchData();
        });
      }
    });
  };

  return (
    <>
      <Button
        style={{ backgroundColor: '#FF66C4' }}
        className="btnSaving bg-purple"
        variant="secondary"
        size="sm"
        onClick={() => handleAddSharedCapital(userId)}
        title="Add member's shared capital"
      >
        <FontAwesomeIcon icon={faPiggyBank} /> Add Shared Capital
        
      </Button>
    </>
  );
}
import { Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

export default function ResetPassword({email, fetchData}) {
	
	const resetPassword = (userId) => {
				
		Swal.fire({
		title: 'Warning',
		icon: 'warning',
		text: 'Are you sure you want to reset the password of this user?',
		showCancelButton: true,
		confirmButtonText: 'Yes, reset it',
		cancelButtonText: 'No, cancel',
		}).then((result) => {

			if (result.isConfirmed) {

				fetch(`https://bnhscoopbackend.herokuapp.com/users/ResetPass/${email}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
						
					}
				})
				.then(data => {
						Swal.fire({
							title: 'Success',
							icon: 'success',
							text: 'Password successfully resetted.'
						})
						fetchData()
				})
			}
		})

	}

	return(

		<>
			{/*<Button className= "btnDanger" variant="danger" size="sm" onClick={() => resetPassword(email)}>Reset Password</Button>*/}
			<Button style={{ backgroundColor: "#101F60" }} className="btnDanger" variant="danger" size="sm" onClick={() => resetPassword(email)} title="Click to Reset Password">
  				<FontAwesomeIcon icon={faUndo} /> Reset Password
			</Button>
				
		</>

		)
}
import { Button} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash  } from '@fortawesome/free-solid-svg-icons';

export default function DeleteUser({email, fetchData}) {

	const DeleteUser = (userId) => {
			
			Swal.fire({
				title: 'Warning',
				icon: 'warning',
				text: 'Are you sure you want to delete this user?',
				showCancelButton: true,
				confirmButtonText: 'Yes, delete it',
				cancelButtonText: 'No, cancel',
				}).then((result) => {
				
				if (result.isConfirmed) {
					fetch(`https://bnhscoopbackend.herokuapp.com/users/deleteUser/${userId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
							
						}
					})
					.then(data => {
							Swal.fire({
								title: 'Success',
								icon: 'success',
								text: 'Member successfully deleted from the system!'
							})
							fetchData()
					})
				}
			})

			

	}

	return(

		<>
			{/*<Button className= "btnDanger" variant="danger" size="sm" onClick={() => DeleteUser(user)}>Delete</Button>*/}

			<Button style={{ backgroundColor: "#101F60" }} className="btnDanger" variant="danger" size="sm" onClick={() => DeleteUser(email)} title="Click to Delete the User">
  				<FontAwesomeIcon icon={faTrash} /> Delete
			</Button>
				
		</>

		)
}
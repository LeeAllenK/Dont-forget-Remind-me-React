import { useState, useEffect } from "react";
import { auth, provider } from './config.jsx';
import { signInWithPopup } from "firebase/auth"
import App from '../App.js'


function SignIn() {

	const [value, setValue] = useState('');

	const handleClick = () => {
		signInWithPopup(auth, provider).then((data) => {
			setValue(data.user.email);
			localStorage.setItem("email", data.user.email);
		})
	}


	useEffect(() => {
		setValue(localStorage.getItem('email'));
	}, [])

	return (
		<dfv>
			{value ? <App /> :
				<div className="signIn" > 
				<button 
				className="signinBtn"
				onClick={handleClick} 
				>
				Sign-In with Gmail</button>
				</div>

			}
		</dfv>
	)
}

export default SignIn;
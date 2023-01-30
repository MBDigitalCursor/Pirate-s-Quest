import React, { useRef } from "react";
import { postReq } from "../../utils/http";
import "./register.css";

function Register() {

	const nickRef = useRef();
	const passRef = useRef();
	const repeatPassRef = useRef();

	const register = async (user) => {
		const regUser = await postReq(user, 'register');
		console.log('regUser --->', regUser);

		if (regUser.error) {
			console.log(regUser.message)
		} else {
			console.log(regUser.message)
		}
	}

	const handleRegForm = (e) => {
		e.preventDefault();

		const newUser = {
			nick: nickRef.current.value,
			passOne: passRef.current.value,
			passTwo: repeatPassRef.current.value,
		}

		register(newUser)
	}

	return (
		<div className="register">
			<h2>Register</h2>

			<form onSubmit={handleRegForm}>
				<label htmlFor="nick">Nickname</label>
				<input ref={nickRef} type="text" id="nick" placeholder="Enter your nickname" />

				<label htmlFor="pass">Password</label>
				<input ref={passRef} type="password" id="pass" placeholder="Enter your password" />

				<label htmlFor="repeatPass">Password repeat</label>
				<input ref={repeatPassRef} type="password" id="repeatPass" placeholder="Enter your password" />

				<button>Register</button>
			</form>
		</div>
	);
}

export default Register;

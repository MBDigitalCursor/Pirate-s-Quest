import React, { useRef } from "react";
import axios from "axios";
import "./login.css";

function Login() {
	const nickRef = useRef();
	const passRef = useRef();

	const handleLogin = () => {
		const loginObj = {
			nick: nickRef.current.value,
			pass: passRef.current.value,
		};

		axios.post("http://localhost:5000/login", loginObj).then((response) => console.log(response));
	};

	return (
		<div className="login">
			<h2>Login</h2>
			<div className="login-inputs">
				<input
					ref={nickRef}
					type="text"
					placeholder="nickname"
				/>
				<input
					ref={passRef}
					type="password"
					placeholder="password"
				/>
			</div>
			<button
				className="login-btn"
				onClick={handleLogin}
			>
				login
			</button>
		</div>
	);
}

export default Login;

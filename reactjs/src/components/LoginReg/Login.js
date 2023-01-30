import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./login.css";
import { setLogged } from "../../store/appStore";

function Login() {
	const dispatch = useDispatch();

	const nickRef = useRef();
	const passRef = useRef();

	const handleLogin = () => {
		const loginObj = {
			nick: nickRef.current.value,
			pass: passRef.current.value,
		};

		axios.post("http://localhost:5000/login", loginObj).then((response) => {
			if (response.data.error) {
				console.log(response.data.message);
			} else {
				console.log("response.data.data ===", response.data.data);
				dispatch(setLogged(response.data.data));
			}
		});
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

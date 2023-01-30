import React from "react";
import Login from "../../components/LoginReg/Login";
import Register from "../../components/LoginReg/Register";
import "./loginRegPage.css";

function LoginReg() {
	return (
		<div className="container">
			<Login />
			<Register />
		</div>
	);
}

export default LoginReg;

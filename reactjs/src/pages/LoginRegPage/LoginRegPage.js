import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../components/LoginReg/Login";
import Register from "../../components/LoginReg/Register";
import { setLoginError } from "../../store/appStore";
import "./loginRegPage.css";

function LoginReg() {
	const { newUser } = useSelector((state) => state.appStore);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setLoginError(""));
	}, [newUser]);

	return <div className="container">{newUser ? <Register /> : <Login />}</div>;
}

export default LoginReg;

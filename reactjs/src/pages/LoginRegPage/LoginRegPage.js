import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../components/LoginReg/Login";
import Register from "../../components/LoginReg/Register";
import { setLoginError } from "../../store/appStore";
import "./loginRegPage.css";
import bgPic from "../../assets/img/login-page-bg.jpg";

function LoginReg() {
	const { newUser } = useSelector((state) => state.appStore);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setLoginError(""));
	}, [newUser]);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				backgroundColor: "white",
			}}
		>
			<Box
				sx={{
					width: "50vw",
					height: "100vh",
					backgroundImage: `url(${bgPic})`,
					backgroundPosition: "-20rem 0rem",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
			></Box>
			<Box
				sx={{
					height: "100vh",
					width: "50vw",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{newUser ? <Register /> : <Login />}
			</Box>
		</Box>
	);
}

export default LoginReg;

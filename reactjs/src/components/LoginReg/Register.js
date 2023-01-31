import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import { BsFillPersonCheckFill, BsFillPersonXFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postReq } from "../../utils/http";
import "./register.css";
import axios from "axios";
import { setLogged, setLoginError, setNewUser } from "../../store/appStore";

function Register() {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { loginError, url, newUser } = useSelector((state) => state.appStore);

	const nickRef = useRef();
	const passRef = useRef();
	const repeatPassRef = useRef();

	const handleRegister = () => {
		const newUser = {
			nick: nickRef.current.value,
			passOne: passRef.current.value,
			passTwo: repeatPassRef.current.value,
		};

		if (newUser.nick === "" && newUser.passOne === "" && newUser.passTwo === "") {
			dispatch(setLoginError("Please fill all the fields"));
			return;
		}

		axios.post(`${url}/register`, newUser).then((response) => {
			if (response.data.error) {
				console.log(response.data.message);
				dispatch(setLoginError(response.data.message));
			} else {
				setTimeout(() => {
					nav("/main");
				}, 500);
			}
		});
	};

	return (
		<div className="register">
			<Container
				component="main"
				maxWidth="xs"
			>
				<Box
					className={loginError ? "slide-top" : ""}
					sx={{
						marginTop: 7,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Box
						className={loginError ? "slide-top" : ""}
						sx={{
							textAlign: "center",
						}}
					>
						{loginError ? (
							<BsFillPersonXFill
								className="login-icon-error flip-2-hor-top-1 "
								fontSize="2rem"
							/>
						) : (
							<BsFillPersonCheckFill
								className="login-icon"
								fontSize="2rem"
							/>
						)}
						<Typography
							component="h1"
							variant="h5"
							sx={{
								marginTop: "1rem",
								color: "#000",
							}}
						>
							Register
						</Typography>
					</Box>
					{!loginError ? (
						<Box>
							<TextField
								inputRef={nickRef}
								margin="normal"
								required
								fullWidth
								label="Nickname"
								autoFocus
							/>
							<TextField
								inputRef={passRef}
								margin="normal"
								color="primary"
								required
								fullWidth
								label="Password"
								type="password"
								autoComplete="current-password"
							/>
							<TextField
								inputRef={repeatPassRef}
								margin="normal"
								required
								fullWidth
								label="Repeat password"
								type="password"
								autoComplete="current-password"
							/>
						</Box>
					) : (
						<Box>
							<TextField
								inputRef={nickRef}
								error
								fullWidth
								id="outlined-error-helper-text"
								label="Error"
								color="primary"
								helperText={loginError}
								sx={{
									marginTop: "0.55rem",
									outlineColor: "green",
								}}
							/>
							<TextField
								inputRef={passRef}
								margin="normal"
								required
								fullWidth
								label="Password"
								type="password"
								autoComplete="current-password"
							/>
							<TextField
								inputRef={repeatPassRef}
								margin="normal"
								required
								fullWidth
								label="Repeat password"
								type="password"
								autoComplete="current-password"
							/>
						</Box>
					)}
				</Box>
				{loginError ? (
					<Box className={loginError ? "slide-down" : ""}>
						<Button
							onClick={handleRegister}
							fullWidth
							color="errorRed"
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								fontWeight: "bold",
								color: "white",
							}}
						>
							Sign In
						</Button>
					</Box>
				) : (
					<Box className={loginError ? "slide-down" : ""}>
						<Button
							onClick={handleRegister}
							fullWidth
							color="gold"
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								fontWeight: "bold",
							}}
						>
							Register
						</Button>
					</Box>
				)}
				<Box
					sx={{
						textAlign: "center",
						color: "black",
					}}
				>
					<Link
						onClick={() => {
							dispatch(setNewUser(!newUser));
						}}
					>
						Log in
					</Link>
				</Box>
			</Container>
		</div>
	);
}

export default Register;

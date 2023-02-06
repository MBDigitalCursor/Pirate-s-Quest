import React, { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./login.css";
import { setLogged, setLoginError, setNewUser, setOpenModal } from "../../store/appStore";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { BsFillPersonXFill, BsFillPersonCheckFill } from "react-icons/bs";
import { toast } from "react-toastify";
import MainContext from "../../context/MainContext";

function Login() {
	const nav = useNavigate();
	const { loginError, newUser } = useSelector((state) => state.appStore);
	const { socket, dispatch } = useContext(MainContext);

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
				dispatch(setLoginError(response.data.message));
				return;
			} else {
				toast(response.data.message);
				socket.emit("getAllUsers");
				localStorage.setItem("user_id", response.data.data.id);
				dispatch(setLogged(response.data.data));
				nav("/main");
				return;
			}
		});
	};

	return (
		<Container
			component='main'
			maxWidth='xs'
		>
			<Box
				className={loginError ? "slide-top" : ""}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "start",
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
							className='login-icon-error flip-2-hor-top-1 '
							fontSize='2rem'
						/>
					) : (
						<BsFillPersonCheckFill
							className='login-icon'
							fontSize='2rem'
						/>
					)}
					<Typography
						component='h1'
						variant='h5'
						sx={{
							marginTop: "1rem",
							color: "#000",
						}}
					>
						Sign in
					</Typography>
				</Box>
				{!loginError ? (
					<Box>
						<TextField
							inputRef={nickRef}
							margin='normal'
							required
							fullWidth
							label='Nickname'
							autoFocus
						/>
						<TextField
							inputRef={passRef}
							margin='normal'
							color='primary'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
					</Box>
				) : (
					<Box>
						<TextField
							inputRef={nickRef}
							error
							fullWidth
							id='outlined-error-helper-text'
							label='Error'
							color='primary'
							helperText={loginError}
							sx={{
								marginTop: "0.55rem",
								outlineColor: "green",
							}}
						/>
						<TextField
							inputRef={passRef}
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
					</Box>
				)}
			</Box>
			{loginError ? (
				<Box className={loginError ? "slide-down" : ""}>
					<Button
						onClick={handleLogin}
						fullWidth
						color='errorRed'
						variant='contained'
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
						onClick={handleLogin}
						fullWidth
						color='gold'
						variant='contained'
						sx={{
							mt: 3,
							mb: 2,
							fontWeight: "bold",
						}}
					>
						Sign In
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
					New? Register first
				</Link>
			</Box>
		</Container>
	);
}

export default Login;

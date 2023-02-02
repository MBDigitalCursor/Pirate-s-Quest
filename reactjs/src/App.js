import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/css/App.css";
import LoginRegPage from "./pages/LoginRegPage/LoginRegPage";
import Main from "./pages/MainPage/Main";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import MainContext from "../src/context/MainContext";
import { useEffect } from "react";
import { setLogged } from "./store/appStore";

const socket = io.connect("http://localhost:5000");

const theme = createTheme({
	palette: {
		gold: {
			main: "#F6AA1C",
		},
		errorRed: {
			main: "#941B0C",
		},
	},
});

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		socket.emit("checkUser", localStorage.getItem("user_id"));
	}, [socket]);

	useEffect(() => {
		socket.on("checkedUser", (user) => {
			dispatch(setLogged(user));
		});
	}, [socket]);

	useEffect(() => {
		socket.emit("getAllUsers");

		socket.on("getAllUsers", (users) => {
			console.log("getAllUsers ==>", users);
		});
	}, [socket]);

	const states = {
		dispatch,
		socket,
	};

	return (
		<div className="App">
			<MainContext.Provider value={states}>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Routes>
							<Route
								path="/"
								element={<LoginRegPage />}
							/>
							<Route
								path="/main"
								element={<Main></Main>}
							></Route>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</MainContext.Provider>
		</div>
	);
}

export default App;

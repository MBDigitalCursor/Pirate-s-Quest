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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsersThunk, userLoggedThunk } from "./utils/thunkCreators";

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
		const userId = localStorage.getItem("user_id");
		if (userId !== "") {
			dispatch(userLoggedThunk(localStorage.getItem("user_id")));
		}
		dispatch(getUsersThunk());
	}, []);

	const states = {
		dispatch,
		socket,
	};

	return (
		<div className='App'>
			<MainContext.Provider value={states}>
				<ToastContainer
					progressClassName='toast-progress'
					className='toast'
					position='bottom-right'
					autoClose={1000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='light'
				/>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Routes>
							<Route
								path='/'
								element={<LoginRegPage />}
							/>
							<Route
								path='/main'
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/css/App.css";
import LoginRegPage from "./pages/LoginRegPage/LoginRegPage";
import Main from "./pages/MainPage/Main";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import MainContext from "../src/context/MainContext";

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

	const states = {
		dispatch,
		socket,
	};

	return (
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
	);
}

export default App;

import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/css/App.css";
import LoginRegPage from "./pages/LoginRegPage/LoginRegPage";
import Main from "./pages/MainPage/Main";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

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
	return (
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
	);
}

export default App;

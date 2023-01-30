import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/css/App.css";
import LoginRegPage from "./pages/LoginRegPage/LoginRegPage";
import Main from "./pages/MainPage/Main";

function App() {
	return (
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
	);
}

export default App;

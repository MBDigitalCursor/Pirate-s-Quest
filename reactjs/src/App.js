import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/css/App.css";
import LoginRegPage from "./pages/LoginRegPage/LoginRegPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<LoginRegPage />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

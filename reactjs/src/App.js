import axios from "axios";
import "../src/css/App.css";

function App() {
	const obj = {
		a: 5,
		b: 8,
	};

	const test = () => {
		axios.post("");
	};

	return (
		<div className="App">
			<button onClick={test}>test</button>
		</div>
	);
}

export default App;

import axios from "axios";
import "../src/css/App.css";

function App() {
	const obj = {
		mess: "test",
	};

	const test = () => {
		axios.post("http://localhost:5000/test", obj).then(function (response) {
			console.log(response);
		});
	};

	const test2 = () => {
		axios.post("http://localhost:5000/test", obj).then(function (response) {
			console.log(response);
		});
	};

	return (
		<div className="App">
			<button onClick={test}>test</button>
			<button onClick={test2}>test2</button>
			<h2>Test</h2>
			<h2>Test VK</h2>
		</div>
	);
}

export default App;

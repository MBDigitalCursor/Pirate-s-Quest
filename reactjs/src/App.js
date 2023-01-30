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

	return (
		<div className="App">
			<button onClick={test}>test</button>
		</div>
	);
}

export default App;

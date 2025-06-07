import { useState } from 'react';
import ReactLogo from './assets/react.svg?react';
import './App.css';
import { ShowDate } from './components/ShowDate';

function App() {
	const [count, setCount] = useState(0);
	return (
		<>
			<div>
				<ReactLogo />
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<ShowDate />
		</>
	);
}

export default App;

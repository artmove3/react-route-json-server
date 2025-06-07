import { createElement, useState } from 'react';
// import ReactLogo from './assets/react.svg?react';
import reactLogo from './assets/react.svg';
import './App.css';
import { ShowDate } from './components/ShowDate';

function App() {
	const [count, setCount] = useState(0);

	const logoImg = createElement('img', { src: reactLogo });
	const logoContainer = createElement('div', { key: 'logoContainer' }, logoImg);
	const title = createElement('h1', { key: 'title' }, 'Vite + React');
	const button = createElement(
		'button',
		{
			key: 'button',
			onClick: () => setCount((count) => count + 1),
		},
		`count is ${count}`,
	);

	const p = createElement('p', { key: 'p' }, `Edit src/App.jsx and save to test HMR`);

	const card = createElement('div', { className: 'card', key: 'card' }, [button, p]);
	const container = createElement('div', null, [
		logoContainer,
		title,
		card,
		ShowDate(),
	]);

	return container;
}

export default App;

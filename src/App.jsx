import styles from './App.module.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/mainPage';
import { TodoPage } from './pages/todoPage';
import { NotFound } from './pages/notFound';

function App() {
	return (
		<div className={styles.appContainer}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/todo/:id" element={<TodoPage />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
}

export default App;

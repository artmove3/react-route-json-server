import { useState } from 'react';
import styles from './App.module.css';
import { useRequestGetTodos, addTodo, deleteTodo, updateTodo } from './components';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { MainPage } from './pages/mainPage';
import { TodoPage } from './pages/todoPage';
import { NotFound } from './pages/notFound';

function App() {
	const [todos, setTodos] = useState([]);
	const [currentUpdating, setCurrentUpdating] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [findedTodos, setFindedTodos] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const navigate = useNavigate();

	useRequestGetTodos(setTodos, isSorted);

	const addTodoButtonHandle = (newTodoValue) =>
		addTodo(newTodoValue, setTodos, resetSearch);

	const deleteTodoButtonHandler = (targetId) => {
		deleteTodo(targetId, setTodos, resetSearch, navigate);
	};

	const updateButtonHandler = (e, targetId) => {
		updateTodo(e, targetId, setCurrentUpdating, setTodos, resetSearch);
	};

	const searchInputHandler = (value) => {
		setSearchValue(value);
		if (value && value.length > 2) {
			setFindedTodos(todos.filter((todo) => todo.title.includes(value)));
		} else setFindedTodos([]);
	};

	const sortTodosButtonHandler = () => {
		setIsSorted((prev) => !prev);
		resetSearch();
	};
	const resetSearch = () => {
		setFindedTodos([]);
		setSearchValue('');
	};

	const mainPageProps = {
		todos,
		findedTodos,
		searchValue,
		isSorted,
		searchInputHandler,
		addTodoButtonHandle,
		sortTodosButtonHandler,
	};

	const todoPageProps = {
		currentUpdating,
		deleteTodoButtonHandler,
		updateButtonHandler,
		setCurrentUpdating,
		navigate,
	};

	const notFoundProps = { navigate };

	return (
		<div className={styles.appContainer}>
			<Routes>
				<Route path="/" element={<MainPage props={mainPageProps} />} />
				<Route path="/todo/:id" element={<TodoPage props={todoPageProps} />} />
				<Route path="/404" element={<NotFound props={notFoundProps} />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
}

export default App;

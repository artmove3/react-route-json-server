import { NavLink } from 'react-router-dom';
import styles from '../App.module.css';
import { useState } from 'react';
import { addTodo, useRequestGetTodos } from '../components';

export const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [findedTodos, setFindedTodos] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [newTodo, setNewTodo] = useState('');

	const addTodoButtonHandle = (newTodoValue) =>
		addTodo(newTodoValue, setTodos, resetSearch);

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

	const [isSorted, setIsSorted] = useState(false);

	const resetSearch = () => {
		setFindedTodos([]);
		setSearchValue('');
	};

	useRequestGetTodos(setTodos, isSorted);

	return (
		<>
			{todos.length > 0 && (
				<div className={styles.searchContainer}>
					<h3>Поиск в списке дел:</h3>
					<input
						className={styles.searchInput}
						type="text"
						value={searchValue}
						placeholder="Поиск начинается с трех символов"
						onChange={({ target }) => searchInputHandler(target.value)}
					/>
				</div>
			)}

			{Object.entries(findedTodos.length === 0 ? todos : findedTodos).map(
				([key, { id, title }]) => {
					return (
						<div className={styles.todoItem} key={key}>
							<NavLink to={`/todo/${id}`}>
								<p id={id}>
									{title.length > 30
										? title.slice(0, 29) + '...'
										: title}
								</p>
							</NavLink>
						</div>
					);
				},
			)}
			<input
				type="text"
				className={styles.addTodoInput}
				value={newTodo}
				onChange={({ target }) => {
					setNewTodo(target.value);
				}}
				onKeyUp={(e) => {
					if (e.code === 'Enter') {
						addTodoButtonHandle(e.target.value);
						setNewTodo('');
					}
				}}
			/>
			{newTodo.length > 0 && (
				<p className={styles.newTodoInputHint}>
					чтобы добавить дело, нажми Enter
				</p>
			)}
			<button disabled={todos.length < 2} onClick={sortTodosButtonHandler}>
				{isSorted ? 'Отменить сортировку' : 'По алфавиту'}
			</button>
		</>
	);
};

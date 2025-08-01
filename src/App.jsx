import { useEffect, useState } from 'react';
import styles from './App.module.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [currentUpdating, setCurrentUpdating] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [findedTodos, setFindedTodos] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		fetch('http://localhost:3000/todos')
			.then((response) => response.json())
			.then((json) => {
				if (isSorted)
					setTodos(
						json.sort((a, b) =>
							a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
						),
					);
				else setTodos(json);
			});
	}, [isSorted]);

	const addTodoButtonHandle = () => {
		if (!newTodo) {
			setNewTodo('');
			return;
		}
		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: { 'Content-type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: Date.now(),
				title: newTodo.trim(),
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodos((prevTodos) => [...prevTodos, response]);
				setNewTodo('');
			})
			.finally(() => resetSearch());
	};

	const deleteTodoButtonHandler = (targetId) => {
		fetch(`http://localhost:3000/todos/${targetId}`, {
			method: 'DELETE',
		})
			.then(() => {
				setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== targetId));
			})
			.finally(() => resetSearch());
	};

	const updateButtonHandler = (e, targetId) => {
		if (e.code === 'Enter') {
			if (!e.target.value) {
				setCurrentUpdating('');
				return;
			}
			fetch(`http://localhost:3000/todos/${targetId}`, {
				method: 'PUT',
				headers: { 'Content-type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					id: targetId,
					title: e.target.value.trim(),
				}),
			})
				.then((response) => response.json())
				.then((updatedTodo) => {
					setTodos((prevTodos) =>
						prevTodos.map((todo) =>
							todo.id === updatedTodo.id ? updatedTodo : todo,
						),
					);
				})
				.finally(() => {
					setCurrentUpdating('');
					resetSearch();
				});
		}
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

	return (
		<div className={styles.appContainer}>
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
							<p id={id}>{title}</p>
							<div className={styles.todoItemOptionsContainer}>
								<button
									id={id}
									onClick={() => deleteTodoButtonHandler(id)}
								>
									Удалить дело
								</button>
								{currentUpdating === id ? (
									<input
										onKeyUp={(event) =>
											updateButtonHandler(event, id)
										}
										placeholder="Нажми Enter, чтобы обновить"
									></input>
								) : (
									<button onClick={() => setCurrentUpdating(id)}>
										Обновить дело
									</button>
								)}
							</div>
						</div>
					);
				},
			)}
			<input
				type="text"
				value={newTodo}
				className={styles.addTodoInput}
				onChange={({ target }) => {
					setNewTodo(target.value);
				}}
			/>
			<button onClick={addTodoButtonHandle}>Добавить дело</button>
			<button onClick={sortTodosButtonHandler}>
				{isSorted ? 'Отменить сортировку' : 'По алфавиту'}
			</button>
		</div>
	);
}

export default App;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from '../App.module.css';

export const TodoPage = ({ props }) => {
	const params = useParams();
	const [todo, setTodo] = useState({});
	const [isUpdated, setIsUpdated] = useState(false);
	const {
		currentUpdating,
		deleteTodoButtonHandler,
		updateButtonHandler,
		setCurrentUpdating,
		navigate,
	} = props;

	useEffect(() => {
		if (params.id)
			fetch(`http://localhost:3000/todos/${params.id}`)
				.then((response) => response.json())
				.then((json) => setTodo(json));
	}, [params.id, isUpdated]);

	const { id, title } = todo;

	return (
		<div className={styles.todoContainer}>
			<div id={id}>{title}</div>
			<div className={styles.todoItemOptionsContainer}>
				<button id={id} onClick={() => deleteTodoButtonHandler(id)}>
					Удалить дело
				</button>
				{currentUpdating === id ? (
					<input
						onKeyUp={(event) => {
							updateButtonHandler(event, id);
							setIsUpdated((prev) => !prev);
						}}
						placeholder="Нажми Enter, чтобы обновить"
					></input>
				) : (
					<button onClick={() => setCurrentUpdating(id)}>Обновить дело</button>
				)}
			</div>
			<button onClick={() => navigate('/')}>На главную</button>
		</div>
	);
};

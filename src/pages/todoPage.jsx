import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../App.module.css';
import { updateTodo, deleteTodo } from '../components';

export const TodoPage = () => {
	const params = useParams();
	const [todo, setTodo] = useState({});
	const [isUpdated, setIsUpdated] = useState(false);
	const [currentUpdating, setCurrentUpdating] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		if (params.id)
			fetch(`http://localhost:3000/todos/${params.id}`)
				.then((response) => response.json())
				.then((json) => setTodo(json));
	}, [params.id, isUpdated]);

	const { id, title } = todo;

	const deleteTodoButtonHandler = (targetId) => {
		deleteTodo(targetId, navigate);
	};

	const updateButtonHandler = (e, targetId) => {
		updateTodo(e, targetId, setIsUpdated, setCurrentUpdating);
	};

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
						}}
						placeholder="Нажми Enter, чтобы обновить"
					/>
				) : (
					<button onClick={() => setCurrentUpdating(id)}>Обновить дело</button>
				)}
			</div>
			<button onClick={() => navigate('/')}>На главную</button>
		</div>
	);
};

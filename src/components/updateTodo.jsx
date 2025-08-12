export const updateTodo = (e, targetId, setIsUpdated, setCurrentUpdating) => {
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
			// .then((updatedTodo) => {
			// 	setTodos((prevTodos) =>
			// 		prevTodos.map((todo) =>
			// 			todo.id === updatedTodo.id ? updatedTodo : todo,
			// 		),
			// 	);
			// })
			.finally(() => {
				setCurrentUpdating('');
				setIsUpdated((prev) => !prev);
			});
	}
};

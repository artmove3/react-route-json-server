export const deleteTodo = (targetId, navigate) => {
	fetch(`http://localhost:3000/todos/${targetId}`, {
		method: 'DELETE',
	})
		// .then(() => {
		// 	setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== targetId));
		// })
		.finally(() => {
			navigate('/');
		});
};

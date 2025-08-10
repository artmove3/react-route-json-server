export const deleteTodo = (targetId, setTodos, resetSearch, navigate) => {
	fetch(`http://localhost:3000/todos/${targetId}`, {
		method: 'DELETE',
	})
		.then(() => {
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== targetId));
		})
		.finally(() => {
			resetSearch();
			navigate('/');
		});
};

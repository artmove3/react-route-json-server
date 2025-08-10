export const addTodo = (newTodoValue, setTodos, resetSearch) => {
	if (!newTodoValue) {
		return;
	}
	fetch('http://localhost:3000/todos', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			id: Date.now(),
			title: newTodoValue.trim(),
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then((response) => {
			setTodos((prevTodos) => [...prevTodos, response]);
		})
		.finally(() => resetSearch());
};

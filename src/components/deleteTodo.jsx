export const deleteTodo = (targetId, navigate) => {
	fetch(`http://localhost:3000/todos/${targetId}`, {
		method: 'DELETE',
	}).finally(() => {
		navigate('/');
	});
};

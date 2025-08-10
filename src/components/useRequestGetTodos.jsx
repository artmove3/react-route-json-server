import { useEffect } from 'react';

export const useRequestGetTodos = (setTodos, isSorted) => {
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
};

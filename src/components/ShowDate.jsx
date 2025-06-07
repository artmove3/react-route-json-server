import { createElement } from 'react';

export function ShowDate() {
	const date = new Date();
	const current = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

	return createElement('div', { key: 'date' }, current);
}

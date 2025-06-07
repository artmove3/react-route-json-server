export function ShowDate() {
	const date = new Date();
	const current = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

	return <div>Текущая дата: {current}</div>;
}

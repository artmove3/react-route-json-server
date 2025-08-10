export const NotFound = ({ props }) => {
	return (
		<>
			<h1>Данная страница не существует</h1>
			<button onClick={() => props.navigate('/')}>На главную</button>
		</>
	);
};

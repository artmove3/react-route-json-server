import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
	const navigate = useNavigate();
	return (
		<>
			<h1>Данная страница не существует</h1>
			<button onClick={() => navigate('/')}>На главную</button>
		</>
	);
};

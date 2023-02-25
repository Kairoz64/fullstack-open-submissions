import axios from 'axios';

export const getAnecdotes = async () => {
	const res = await axios.get('http://localhost:3001/anecdotes');
	return res.data;
};
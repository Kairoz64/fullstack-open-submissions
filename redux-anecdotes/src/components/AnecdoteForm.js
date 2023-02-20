import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote, sortByVotes } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();
	const [newAnecdote, setNewAnecdote] = useState('');

	const sortAnecdotes = () => {
		dispatch(sortByVotes());
	};

	const addAnecdote = (e) => {
		e.preventDefault();
		dispatch(createAnecdote(newAnecdote));
		setNewAnecdote('');
		sortAnecdotes();
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input
						value={newAnecdote}
						onChange={(e) => setNewAnecdote(e.target.value)}
					/>
				</div>
				<button>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
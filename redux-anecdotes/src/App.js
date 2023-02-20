import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortByVotes, incrementVoteOf, createAnecdote } from './reducers/anecdoteReducer';

const App = () => {
	const anecdotes = useSelector(state => state);
	const dispatch = useDispatch();
	const [newAnecdote, setNewAnecdote] = useState('');

	useEffect(() => {
		sortAnecdotes();
	}, []);

	const vote = (id) => {
		dispatch(incrementVoteOf(id));
		sortAnecdotes();
	};

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
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
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

export default App;
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortByVotes, incrementVoteOf } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
	const anecdotes = useSelector(state => state);
	const dispatch = useDispatch();

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
			<AnecdoteForm />
		</div>
	);
};

export default App;
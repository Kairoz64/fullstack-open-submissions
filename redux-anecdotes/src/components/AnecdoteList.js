import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementVoteOf, sortByVotes } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
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
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>)}
		</div>
	);
};

export default AnecdoteList;
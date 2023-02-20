import { useSelector, useDispatch } from 'react-redux';
import { incrementVoteOf } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(state.filter));
		return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);
	});

	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(incrementVoteOf(id));
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
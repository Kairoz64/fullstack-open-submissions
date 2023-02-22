import { useSelector, useDispatch } from 'react-redux';
import { incrementVoteOf } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(state.filter));
		return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);
	});
	const dispatch = useDispatch();

	const vote = (anecdote) => {
		dispatch(incrementVoteOf(anecdote.id));
		dispatch(setNotification(`you voted '${anecdote.content}'`));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
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
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>)}
		</div>
	);
};

export default AnecdoteList;
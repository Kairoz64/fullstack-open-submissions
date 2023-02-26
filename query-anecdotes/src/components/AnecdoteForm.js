import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../services/anecdotes';
import { usePutNotification } from '../NotificationContext';

const AnecdoteForm = () => {
	const putNotification = usePutNotification();
	const queryClient = useQueryClient();
	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes');
			queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));
			putNotification(`anecdote '${newAnecdote.content}' created`, 5);
		}
	});


	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		newAnecdoteMutation.mutate({ content, votes: 0 });
		event.target.anecdote.value = '';
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;

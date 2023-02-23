import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

//const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
	'name': 'anecdotes',
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			return state.concat(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
		incrementVoteOf(state, action) {
			const id = action.payload;
			const anecdoteToChange = state.find(a => a.id === id);
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1
			};

			return state.map(a => a.id !== id ? a : changedAnecdote);
		}
	}
});

export const { setAnecdotes, appendAnecdote, incrementVoteOf } = anecdoteSlice.actions;

export const initializeAnecdotes= () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const incrementVote = (anecdote) => {
	return async dispatch => {
		const updatedAnecdote = await anecdoteService.update(anecdote.id, {
			...anecdote,
			votes: anecdote.votes + 1
		});
		dispatch(incrementVoteOf(updatedAnecdote.id));
	};
};

export default anecdoteSlice.reducer;
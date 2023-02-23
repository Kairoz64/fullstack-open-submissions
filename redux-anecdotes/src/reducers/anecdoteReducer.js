import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
	'name': 'anecdotes',
	initialState: [],
	reducers: {
		createAnecdote: {
			reducer: (state, action) => {
				return state.concat(action.payload);
			},
			prepare: (content) => {
				const id = getId();
				return {
					payload: { content, id, votes: 0 }
				};
			}
		},
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

export const {
	setAnecdotes,
	appendAnecdote,
	createAnecdote,
	incrementVoteOf
} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
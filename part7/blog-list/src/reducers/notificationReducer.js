import { createSlice } from '@reduxjs/toolkit';

let timerID = 0;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: '', isError: false },
  reducers: {
    setUpNotification(state, action) {
      return {
        ...state,
        content: action.payload.content,
        isError: action.payload.isError
      };
    },
    clearNotification(state) {
      return {
        ...state,
        content: '',
        isError: false
      };
    }
  }
});

export const { setUpNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (content, time, isError = false) => {
  return (dispatch) => {
    window.clearTimeout(timerID);
    dispatch(setUpNotification({ content, isError }));
    timerID = window.setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;

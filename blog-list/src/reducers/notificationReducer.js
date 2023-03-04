import { createSlice } from '@reduxjs/toolkit';

let timerID = 0;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setUpNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    }
  }
});

export const { setUpNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return dispatch => {
    window.clearTimeout(timerID);
    dispatch(setUpNotification(content));
    timerID = window.setTimeout(() => {
      dispatch(clearNotification());
    }, time*1000);
  };
};

export default notificationSlice.reducer;
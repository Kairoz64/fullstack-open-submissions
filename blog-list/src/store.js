import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import loggedUserReducer from './reducers/loggedUserReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    loggedUser: loggedUserReducer
  }
});

export default store;

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedUser, unsetLoggedUser } from './reducers/loggedUserReducer';
import { setNotification } from './reducers/notificationReducer';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Toggleable from './components/Toggleable';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(unsetLoggedUser());
    blogService.setToken(null);
    dispatch(setNotification('Log out successfully!', 5));
  };

  const toggle = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification />
      {!user && <Login />}
      {user && (
        <>
          <div>
            {' '}
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm toggle={toggle} />
          </Toggleable>
          <Blogs />
        </>
      )}
    </div>
  );
};

export default App;

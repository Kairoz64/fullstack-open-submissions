import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Toggleable from './components/Toggleable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (e) {
      dispatch(setNotification('Wrong credentials', 5, true));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    blogService.setToken(null);
    dispatch(setNotification('Log out successfully!', 5));
  };

  const toggle = () => {
    blogFormRef.current.toggleVisibility();
  };

  const renderLogin = () => {
    return (
      <div>
        <Notification />
        <Login login={login} />
      </div>
    );
  };

  const renderApp = () => {
    return (
      <div>
        <Notification />
        <div>
          {user.username} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <Toggleable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm toggle={toggle} />
        </Toggleable>
        <Blogs user={user} />
      </div>
    );
  };

  if (user) {
    return renderApp();
  } else {
    return renderLogin();
  }
};

export default App;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import loginService from '../services/login';
import blogService from '../services/blogs';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (e) {
      dispatch(setNotification('Wrong credentials', 5, true));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
        <input
          id="username-login"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password-login"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="submit-login" type="submit">
        login
      </button>
    </form>
  );
};

export default Login;

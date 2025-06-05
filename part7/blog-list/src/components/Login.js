import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedUser } from '../reducers/loggedUserReducer';
import { setNotification } from '../reducers/notificationReducer';
import loginService from '../services/login';
import blogService from '../services/blogs';
import styled from 'styled-components';

const LoginButton = styled.button`
  background: #ffbf34;
  padding: 8px 12px;
  border:  solid #ffd885 2px;
  border-radius: 5px;
  color: #000;
  font-weight: 900;
  margin-top: 8px;
`;

const Input = styled.input`
  background: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  margin: 4px 8px;
  color: #000;
`;

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
      dispatch(setLoggedUser(user));
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
        Username
        <Input
          id="username-login"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <Input
          id="password-login"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <LoginButton id="submit-login" type="submit">
        login
      </LoginButton>
    </form>
  );
};

export default Login;

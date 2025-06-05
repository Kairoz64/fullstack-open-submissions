import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN, {
    onError: (e) => {
      const errors = e.graphQLErrors[0].message;
      console.log(errors);
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
    }
  }, [result.data, setToken]);

  if (!show) {
    return null;
  }

  const submit = async (e) => {
    e.preventDefault();
    await login({
      variables: { username, password }
    });
    setPage('authors');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;

import { useState } from 'react';

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

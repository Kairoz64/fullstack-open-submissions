const Login = ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit
  }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default Login;
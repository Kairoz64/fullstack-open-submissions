import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

const Blogs = ({blogs}) => {
  return(
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  );
}

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      console.log('Wrong credentials')
    }
  }

  return (
    <div>
      {user === null && 
        <Login 
          username={username}
          password={password}
          handleUsernameChange={({target}) => {setUsername(target.value)}}
          handlePasswordChange={({target}) => {setPassword(target.value)}}
          handleSubmit={handleLogin}
      />}
      {user !== null && <Blogs blogs={blogs}/>}
    </div>
  )
}

export default App
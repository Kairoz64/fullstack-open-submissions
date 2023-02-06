import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogForm = ({
    title, handleTitleChange,
    author, handleAuthorChange,
    url, handleUrlChange,
    handleSubmit 
  }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <div>
        title:
        <input 
          type="text" 
          value={title} 
          name="Title" 
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input 
          type="text" 
          value={author} 
          name="Author" 
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input 
          type="text" 
          value={url}
          name="Url" 
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
}

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

const Blogs = ({blogs, user}) => {
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
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = (e) => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    blogService.setToken(null);
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogService.create({
        title, author, url
      });
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs([...blogs, newBlog]);
    } catch(e) {
      console.log('error creating blog');
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
      {user !== null && <div>{user.username} logged in 
        <button onClick={handleLogout}>logout</button></div>}
      {user !== null && <BlogForm 
        title={title} handleTitleChange={({target}) => {setTitle(target.value)}}
        author={author} handleAuthorChange={({target}) => {setAuthor(target.value)}}
        url={url} handleUrlChange={({target}) => {setUrl(target.value)}}
        handleSubmit={handleCreateBlog}
      />}
      {user !== null && <Blogs blogs={blogs}/>}
    </div>
  )
}

export default App
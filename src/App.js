import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Toggleable from './components/Toggleable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const blogs = await blogService.getAll();
			setBlogs(blogs);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const clearNotification = () => {
		setMessage(null);
		setIsError(false);
	};

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
			setIsError(true);
			setMessage('Wrong credentials');
			setTimeout(() => clearNotification(), 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser');
		setUser(null);
		blogService.setToken(null);
		setMessage('Log out successfully');
		setTimeout(() => clearNotification(), 5000);
	};

	const addBlog = async (blogObject) => {
		try {
			const newBlog = await blogService.create(blogObject);
			setBlogs([...blogs, newBlog]);
			setMessage(`Added a new blog ${newBlog.title} by ${newBlog.author}`);
			setTimeout(() => clearNotification(), 5000);
		} catch(e) {
			setIsError(true);
			setMessage('Error creating a blog');
			setTimeout(() => clearNotification(), 5000);
		}
	};

	if (user === null) {
		return (
			<div>
				{message && <Notification message={message} error={isError}/>}
				<Login
					username={username}
					password={password}
					handleUsernameChange={({ target }) => setUsername(target.value)}
					handlePasswordChange={({ target }) => setPassword(target.value)}
					handleSubmit={handleLogin}
				/>
			</div>
		);
	} else {
		return (
			<div>
				{message && <Notification message={message} error={isError}/>}
				<div>{user.username} logged in
					<button onClick={handleLogout}>logout</button>
				</div>
				<Toggleable buttonLabel='new blog'>
					<BlogForm createBlog={addBlog} />
				</Toggleable>
				<Blogs blogs={blogs} />
			</div>
		);
	}
};

export default App;
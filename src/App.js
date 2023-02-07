import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

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
			console.log('Wrong credentials');
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser');
		setUser(null);
		blogService.setToken(null);
	};

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
	};

	if (user === null) {
		return (
			<div>
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
				<div>{user.username} logged in
					<button onClick={handleLogout}>logout</button>
				</div>
				<BlogForm
					title={title} handleTitleChange={({ target }) => setTitle(target.value)}
					author={author} handleAuthorChange={({ target }) => setAuthor(target.value)}
					url={url} handleUrlChange={({ target }) => setUrl(target.value)}
					handleSubmit={handleCreateBlog}
				/>
				<Blogs blogs={blogs} />
			</div>
		);
	}
};

export default App;
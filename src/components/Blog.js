import { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
	const [visible, setVisible] = useState(false);
	const shownWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const addHttp = (url) => {
		return url.startsWith('http') ? url : 'https://' + url;
	};

	const increaseLikes = async (blog) => {
		await updateBlog(blog.id, {
			...blog,
			likes: blog.likes + 1
		});
	};

	return (
		<div className='blog-container'>
			<div>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
			</div>
			<div style={shownWhenVisible}>
				<a href={addHttp(blog.url)}>{addHttp(blog.url)}</a>
				<div>
					likes {blog.likes}
					<button onClick={() => increaseLikes(blog)}>like</button>
				</div>
				<div>{blog.user.name}</div>
			</div>
		</div>
	);
};

export default Blog;
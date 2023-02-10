import { useState } from 'react';

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);
	const shownWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const addHttp = (url) => {
		return url.startsWith('http') ? url : 'https://' + url;
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
					<button>like</button>
				</div>
				<div>{blog.user.name}</div>
			</div>
		</div>
	);
};

export default Blog;
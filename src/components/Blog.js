import { useState } from 'react';

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);
	const shownWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div className='blog-container'>
			<div>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
			</div>
			<div style={shownWhenVisible}>
				<div>{blog.url}</div>
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
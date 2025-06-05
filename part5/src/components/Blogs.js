import Blog from './Blog';

const Blogs = ({ blogs, user, updateBlog, removeBlog }) => {
	return(
		<>
			<h2>blogs</h2>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} user={user}
					updateBlog={updateBlog} removeBlog={removeBlog} />
			)}
		</>
	);
};

export default Blogs;
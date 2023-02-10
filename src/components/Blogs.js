import Blog from './Blog';

const Blogs = ({ blogs, updateBlog }) => {
	return(
		<>
			<h2>blogs</h2>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
			)}
		</>
	);
};

export default Blogs;
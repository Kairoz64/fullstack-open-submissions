import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogReducer';
import Blog from './Blog';

const Blogs = ({ user, updateBlog, removeBlog }) => {
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </>
  );
};

export default Blogs;

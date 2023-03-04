import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementLike, deleteBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const shownWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addHttp = (url) => {
    return url.startsWith('http') ? url : 'https://' + url;
  };

  const increaseLikes = async (blog) => {
    try {
      await dispatch(incrementLike(blog));
    } catch (e) {
      dispatch(setNotification('Error updating blog', 5, true));
    }
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog.id));
        dispatch(setNotification('Blog removed successfully', 5));
      } catch (e) {
        dispatch(setNotification('Error removing blog', 5, true));
      }
    }
  };

  return (
    <div className="blog-container">
      <div className="blog-info">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={shownWhenVisible} className="blog-details">
        <a href={addHttp(blog.url)}>{addHttp(blog.url)}</a>
        <div className="number-likes">
          likes {blog.likes}
          <button className="like-button" onClick={() => increaseLikes(blog)}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username && (
          <div>
            <button onClick={() => removeBlog(blog)}>remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

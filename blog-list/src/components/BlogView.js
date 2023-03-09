import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { initializeBlogs } from '../reducers/blogReducer';
import { incrementLike, deleteBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogView = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const user = useSelector((state) => state.loggedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

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
        navigate('/');
      } catch (e) {
        dispatch(setNotification('Error removing blog', 5, true));
      }
    }
  };

  if (!blog) {
    return null;
  } else {
    return (
      <div>
        <h2>{blog.title}</h2>
        <a href={addHttp(blog.url)}>{addHttp(blog.url)}</a>
        <div className="number-likes">
          likes {blog.likes}
          <button className="like-button" onClick={() => increaseLikes(blog)}>
            like
          </button>
        </div>
        {user.username === blog.user.username && (
          <div>
            <button onClick={() => removeBlog(blog)}>remove</button>
          </div>
        )}
        <div>{`added by ${blog.user.name}`}</div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map((c) => (
            <li key={c.id}>{c.content}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default BlogView;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = ({ toggle }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createBlog({ title, author, url }));
      dispatch(setNotification(`Added a new blog ${title} by ${author}`, 5));
      toggle();
    } catch (e) {
      dispatch(setNotification('Error creating a blog', 5, true));
    }
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
        title:
        <input
          id="title-newBlog"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author-newBlog"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url-newBlog"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="submit-newBlog" className="submit-button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;

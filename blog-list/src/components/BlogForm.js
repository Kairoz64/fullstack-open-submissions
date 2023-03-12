import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import styled from 'styled-components';

const Button = styled.button`
  background: #ffbf34;
  padding: 8px 12px;
  border:  solid #ffd885 2px;
  border-radius: 5px;
  color: #000;
  font-weight: 900;
  margin-top: 8px;
`;

const Input = styled.input`
  background: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  margin: 4px 8px;
  color: #000;
`;

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
        Title:
        <Input
          id="title-newBlog"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <Input
          id="author-newBlog"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <Input
          id="url-newBlog"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button id="submit-newBlog" className="submit-button" type="submit">
        Create
      </Button>
    </form>
  );
};

export default BlogForm;

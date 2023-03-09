import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    incrementLikeOf(state, action) {
      const id = action.payload;
      const blogToChange = state.find((b) => b.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      };

      return state.map((b) => (b.id !== id ? b : changedBlog));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
    appendComment(state, action) {
      const id = action.payload.blog.id;
      const blogToChange = state.find((b) => b.id === id);
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments.concat(action.payload)
      };
      return state.map((b) => (b.id !== id ? b : changedBlog));
    }
  }
});

export const {
  appendBlog,
  setBlogs,
  incrementLikeOf,
  removeBlog,
  appendComment
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ title, author, url });
    dispatch(appendBlog(newBlog));
  };
};

export const incrementLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    });
    dispatch(incrementLikeOf(updatedBlog.id));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export const createComment = ({ blogId, content }) => {
  return async (dispatch) => {
    const newComment = await blogService.createComment(blogId, { content });
    dispatch(appendComment(newComment));
  };
};

export default blogSlice.reducer;

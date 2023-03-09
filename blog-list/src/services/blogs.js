import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return res.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

const getComments = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}/comments`);
  return res.data;
};

const createComment = async (id, newComment) => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.post(`${baseUrl}/${id}/comments`, newComment, config);
  return res.data;
};

export default {
  getAll,
  create,
  update,
  remove,
  getComments,
  createComment,
  setToken
};

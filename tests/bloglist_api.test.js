const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});

describe('Testing blog api' , () => {
  test('All blogs are fetched', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
  });

  test('Checks if a blog have an id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('Checks if a valid blog can be added', async () => {
    const newBlog = {
      title: 'My new song',
      author: 'Chencho Perez',
      url: 'gatonco.com',
      likes: 77
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const titles = response.body.map(b => b.title);

    expect(response.body).toHaveLength(blogs.length + 1);
    expect(titles).toContain('My new song');
  });

  test('Adding a blog without likes property defaults to 0 likes', async () => {
    const newBlog = {
      title: 'Ipsum Lorem',
      author: 'Examplifly',
      url: 'example.com'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(blogs.length + 1);
    expect(response.body.slice(-1)[0].likes).toBe(0);
  });

  test('You can not add a blog missing a title', async () => {
    const newBlog = {
      author: 'Examplifly',
      url: 'example.com',
      likes: 30
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
  });

  test('You can not add a blog missing an author', async () => {
    const newBlog = {
      title: 'Ipsum Lorem',
      url: 'example.com',
      likes: 30
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(blogs.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
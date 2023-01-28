const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

const users = [
  {
    username: 'cat0',
    name: 'Chencho Perez',
    password: 'miauuuuu'
  },
  {
    username: 'trolololo',
    name: 'Troll Face',
    password: 'llllllll'
  }
];

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(users);
});

describe('Adding invalid users', () => {
  test('when username is 0 characters long', async () => {
    const user = {
      username: '',
      name: 'Whatever',
      password: 'shalalala'
    };

    let initialUsers = await User.find({});
    initialUsers = initialUsers.map(b => b.toJSON());

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await api
      .get('/api/users');

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
    expect(usersAtEnd.body.slice(-1)[0].error).toBe('malformed user');
  });

  test('when username is 1 character long', async () => {
    const user = {
      username: 'a',
      name: 'Whatever',
      password: 'shalalala'
    };

    let initialUsers = await User.find({});
    initialUsers = initialUsers.map(b => b.toJSON());

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await api
      .get('/api/users');

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
    expect(usersAtEnd.body.slice(-1)[0].error).toBe('malformed user');
  });

  test('when username is 2 characters long', async () => {
    const user = {
      username: 'as',
      name: 'Whatever',
      password: 'shalalala'
    };

    let initialUsers = await User.find({});
    initialUsers = initialUsers.map(b => b.toJSON());

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await api
      .get('/api/users');

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
    expect(usersAtEnd.body.slice(-1)[0].error).toBe('malformed user');
  });

  test('when password is 0 characters long', async () => {
    const user = {
      username: 'hackerman',
      name: 'Anonymous',
      password: ''
    };

    let initialUsers = await User.find({});
    initialUsers = initialUsers.map(b => b.toJSON());

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await api
      .get('/api/users');

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
    expect(usersAtEnd.body.slice(-1)[0].error).toBe('malformed user');
  });

  test('when password is 1 character long', async () => {
    const user = {
      username: 'hackerman',
      name: 'Anonymous',
      password: 'a'
    };

    let initialUsers = await User.find({});
    initialUsers = initialUsers.map(b => b.toJSON());

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await api
      .get('/api/users');

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
    expect(usersAtEnd.body.slice(-1)[0].error).toBe('malformed user');
  });

  test('when password is 2 characters long', async () => {
    const user = {
      username: 'hackerman',
      name: 'Anonymous',
      password: 'aa'
    };

    let initialUsers = await User.find({});
    initialUsers = initialUsers.map(b => b.toJSON());

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await api
      .get('/api/users');

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
    expect(usersAtEnd.body.slice(-1)[0].error).toBe('malformed user');
  });

  test('when username is not unique', async () => {
    const user = {
      username: 'cat0',
      name: 'Big Cat',
      password: 'kolifjfd'
    };

    let initialUsers = await User.find({});
    initialUsers = initialUsers.map(b => b.toJSON());

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await api
      .get('/api/users');

    expect(usersAtEnd.body).toHaveLength(initialUsers.length);
    expect(usersAtEnd.body.slice(-1)[0].error).toBe('duplicate username');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
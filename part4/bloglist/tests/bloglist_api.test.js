

const _ = require('lodash')
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require('../app')
const Blog = require('../models/blog');
const User = require('../models/user');
const {hash} = require('bcrypt');
const {getDummyUsers, origBlogs, blogsInDB, nonExistingId, usersInDB} = require('./bloglist_test_helper')

const api = supertest(app)

const newBlog = {
  title: "testblog1",
  author: "me",
  url: "https://me.ai/",
  user: undefined,
}

let origUsers;
beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(origBlogs);
  await User.deleteMany({});
  origUsers = await getDummyUsers();
  await User.insertMany(origUsers)
    .then(users => newBlog.user = `${users[0]._id}`);
})

let jwt;
describe('login', () => {
  test('failed login', async () => {
    await api.post('/api/login')
      .send({urmom:1})
      .expect(401)
  })
  test('good login', async () => {
    const res = await api.post('/api/login')
      .send({username: 'a', password: 'a'})
      .expect(200)
      .expect('Content-Type', /application\/json/);
    jwt = res.body.token
  })
})

test('GET blogs', async () => {
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(res.body).toHaveLength(origBlogs.length);
  expect(res.body[0].id).toBeDefined();
})

describe('POST', () => {
  test('missing auth', async () => {
    const res = await api.post('/api/blogs')
      .send({})
      .expect(401)
  })

  test('missing uid', async () => {
    const res = await api.post('/api/blogs')
      .auth(jwt, {type: 'bearer'})
      .send({})
      .expect(400)
  })

  test('missing params', async () => {
    const badBlog = { urmom: 'hi', user: 'hi'}
    const res = await api.post('/api/blogs')
      .auth(jwt, {type: 'bearer'})
      .send(badBlog)
      .expect(400)
  })

  test('successful POST', async () => {
    // try to POST
    const res = await api.post('/api/blogs')
      .auth(jwt, {type: 'bearer'})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    // check the returned blog object
    expect(_.omit(res.body, ['id']))
      .toStrictEqual({
        ...newBlog,
        likes: 0 // likes should default to 0 if not present 
      });
    // check that the DB contains more posts
    const blogs = await blogsInDB();
    expect(blogs).toHaveLength(origBlogs.length+1);
  })
})

const findBlog = async (title) => {
  const blogs = await blogsInDB();
  const filtered = blogs.filter(b => b.title === title);
  expect(filtered).toHaveLength(1);
  const res = filtered[0];
  expect(res.id).toBeDefined();
  return res;
}

describe('PUT', () => {
  test('update likes', async () => {
    const toEdit = await findBlog(newBlog.title);
    const res = await api.put(`/api/blogs/${toEdit.id}`)
      .send({likes:300})
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.likes).toBe(300)
  })

  test('invalid update', async () => {
    const toEdit = await findBlog(newBlog.title);
    const res = await api.put(`/api/blogs/${toEdit.id}`)
      .send({lmao:999})
      .expect(400)
  })
});

describe('DELETE', () => {
  test('successful delete', async () => {
    // find the blog from previous POST
    const toRemove = await findBlog(newBlog.title);
    // get rid of it
    await api.delete(`/api/blogs/${toRemove.id}`)
      .expect(204);
  })

  test('failed delete', async () => {
    const badId = await nonExistingId();
    await api.delete(`/api/blogs/${badId}`)
      .expect(404);
  })
})

test('GET user', async () => {
  const res = await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(res.body).toHaveLength(origUsers.length);
  expect(res.body[0].id).toBeDefined();
  expect(res.body[0].passwordHash).toBeUndefined();
  expect(_.omit(res.body[0].blogs[0], ['id', 'likes']))
    .toEqual(_.omit(newBlog, ['user']));
})

describe('POST user', () => {
  test('cannot duplicate username', async () => {
    const initialUsers = await usersInDB();
    const newUser = {
      username: 'a', name: 'A', password: 'a'
    };
    const res = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(res.body.error)
      .toContain('expected `username` to be unique')
    expect(await usersInDB()).toEqual(initialUsers);
  })
  test('success', async () => {
    const newUser = {
      username: 'urmom', name: 'hi', password: 'lol'
    };
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const finalUsers = await usersInDB();
    expect(finalUsers).toHaveLength(origUsers.length+1);
    expect(finalUsers.map(u => u.username))
      .toContain('urmom')
  })
})

afterAll(() => {
  mongoose.connection.close()
});

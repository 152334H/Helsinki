

const _ = require('lodash')
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require('../app')
const Blog = require('../models/blog');

const api = supertest(app)

const origBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(origBlogs);
})

const nonExistingId = async () => {
  const blog = new Blog({title: 'no', url: 'no'})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

test('huh', async () => {
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(res.body).toHaveLength(origBlogs.length);
  expect(res.body[0].id).toBeDefined();
})

describe('POST', () => {
  test('missing params', async () => {
    const badBlog = { urmom: 'hi' }
    const res = await api.post('/api/blogs')
      .send(badBlog)
      .expect(400)
  })

  test('successful POST', async () => {
    const newBlog = {
        title: "testblog1",
        author: "me",
        url: "https://me.ai/",
      }
    // try to POST
    const res = await api.post('/api/blogs')
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

describe('DELETE', () => {
  test('successful delete', async () => {
    // find the blog from previous POST
    const blogs = await blogsInDB();
    const filtered = blogs.filter(b => b.title === 'testblog1');
    expect(filtered).toHaveLength(1);
    const toRemove = filtered[0];
    expect(toRemove.id).toBeDefined();
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

afterAll(() => {
  mongoose.connection.close()
});

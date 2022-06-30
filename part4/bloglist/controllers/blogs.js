const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
})

blogsRouter.post('/', async (req, res, nxt) => {
  const saved = await new Blog(req.body).save();
  res.status(201).json(saved);
})

module.exports = blogsRouter;

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
})

blogsRouter.post('/', async (req, res) => {
  const saved = await new Blog(req.body).save();
  res.status(201).json(saved);
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findOneAndRemove({_id: {
    $in: req.params.id
  }});
  res.status(blog === null ? 404 : 204).end();
})

module.exports = blogsRouter;

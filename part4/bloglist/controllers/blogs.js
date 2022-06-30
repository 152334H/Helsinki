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
  const blog = await Blog.findByIdAndUpdate(req.params.id);
  return res.status(blog === null ? 404 : 204).end();
})

blogsRouter.put('/:id', async (req, res) => {
  const {likes} = req.body;
  if (!Number.isFinite(likes))
    return res.status(400).json({error: '`likes` was not provided or non-numeric'})
  const updated = await Blog.findByIdAndUpdate(
    req.params.id, {likes},
    {new: true, runValidators: true, context: 'query'}
  );
  return res.json(updated);
});

module.exports = blogsRouter;

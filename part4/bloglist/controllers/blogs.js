const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', {username: 1, name: 1});
  res.json(blogs);
})

blogsRouter.post('/', async (req, res) => {
  const user = await User.findById(req.body.user);
  if (user === null) return res.status(400)
    .json({error: '`user` ID was invalid or not provided'});

  const saved = await new Blog({
    ...req.body, user: user._id
  }).save();

  try {
    user.blogs.push(saved._id);
    await user.save();
    res.status(201).json(saved);
  } catch (e) {
    console.error("*WARNING*: BLOG WAS PUSHED WITHOUT UPDATING USER")
    throw e;
  }
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

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const {tokenVerifier} = require('../util/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', {username: 1, name: 1});
  res.json(blogs);
})

blogsRouter.post('/', tokenVerifier, async (req, res) => {
  // TODO: use uid from token instead of body
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

blogsRouter.delete('/:id', tokenVerifier, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog === null) return res.status(404).end();

  if (blog.user.toString() !== req.token.id)
    return res.status(401)
      .json({error: 'user was not the creator of the given blog'})

  await blog.remove();
  return res.status(204).end()
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

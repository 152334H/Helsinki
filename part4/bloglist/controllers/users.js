const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', {title: 1, likes: 1, url: 1, author: 1});
  return res.json(users);
})

usersRouter.post('/', async (req, res) => {
  const {username, name, password} = req.body;
  if (typeof password !== 'string' || password.length < 3)
    return res.status(400)
      .json({ error: 'password must be at least 3 characters long' })

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username, name, passwordHash
  })
  const saved = await user.save();
  res.status(201).json(saved);
})

module.exports = usersRouter

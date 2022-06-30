const _ = require('lodash')

const dummy = (blogs) => 1;
const totalLikes = (blogs) => blogs.reduce(
  (v,b) => v+b.likes, 0);
const favoriteBlog = (blogs) => _.pick(blogs.reduce(
    (fav,b) => fav.likes < b.likes ? b : fav
  , {'likes': -1}), ['title', 'author', 'likes'])
const mostCommon = (blogs) => {
  const ls = _(blogs.map(o => o.author))
    .countBy().entries().maxBy(_.last);
  return {author:ls[0], blogs: ls[1]};
};
const mostLiked = (blogs) => {
  const d = Object.create(null);
  const ls = blogs.forEach(b => {
    const {likes, author} = b;
    if (author in d) d[author] += Number(likes);
    else d[author] = Number(likes);
  });
  const best = Object.entries(d).reduce(
    (best, cur) => best[1] < cur[1] ? cur : best
  , [null, -1])
  return {author:best[0], likes: best[1]};
}

module.exports = {dummy, totalLikes, favoriteBlog, mostCommon, mostLiked};

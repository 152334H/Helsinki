
/*
const listHelper = require('../util/list_helper')

test('dummy returns one', () => {
  const blogs = [];
  const res = listHelper.dummy(blogs)
  expect(res).toBe(1)
})

const blogs = [
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

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5)
  })

  test('when list has multiple blogs', () => {
    const res = listHelper.totalLikes(blogs);
    expect(res).toBe(36)
  })
})

describe('most liked', () => {
  test('when list has multiple blogs, find a most liked blog', () => {
    const res = listHelper.favoriteBlog(blogs);
    expect(res).toStrictEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  })
})

describe('most common', () => {
  test('multiple blogs, most common author', () => {
    const res = listHelper.mostCommon(blogs);
    expect(res).toStrictEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
})

describe('most total likes', () => {
  test('multiple blogs, most liked author', () => {
    const res = listHelper.mostLiked(blogs);
    expect(res).toStrictEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });
})

*/

const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, likes) => {
    return sum + likes
  }

  return blogs.length === 0
    ? 0
    : blogs
      .map(blog => blog.likes)
      .reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const sortedBlogs = [...blogs]
  .sort((blog1, blog2) => blog2.likes - blog1.likes)

  return sortedBlogs[0]
}

const mostBlogs = (blogs) => {
  let result = _(blogs)
    .groupBy(blog => blog.author)
    .orderBy(bloglist => -bloglist.length)
    .values()
    .value()
    .map(blogList => ({ author: blogList[0].author, blogs: blogList.length }))[0]

  return result
}

const mostLikes = (blogs) => {
  let result = _(blogs)
    .groupBy(blog => blog.author)
    .map(blogList => ({ 
      author: blogList[0].author, 
      likes: blogList.reduce((sum, blogList) => sum + blogList.likes, 0)
    }))
    .orderBy(blog => -blog.likes)
    .values()
    .value()[0]

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
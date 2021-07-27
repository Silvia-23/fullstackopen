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

//TODO EXERCISES 4.6 AND 4.7 ARE MISSING|
const mostBlogs = (blogs) => {
  let authorsAndPosts = [...blogs]
  authorsAndPosts = _.groupBy(authorsAndPosts, blog => blog.author)
  _.map(authorsAndPosts, blog => ({ author: blog.key, posts: blog.values.length }))
  //console.log(_.maxBy(authorsAndPosts, blogList => blogList.values.length))
  return authorsAndPosts.values[0]
}

const mostLikes = (blogs) => {
  console.log(_.chain([...blogs])
    .groupBy(blog => blog.author)
    .reduce((sum, blogList) => sum + blogList.likes).value())
  return _.chain([...blogs])
    .maxBy(blog => blog.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
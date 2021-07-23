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
  const sortedBlogs = blogs
  .sort((blog1, blog2) => blog2.likes - blog1.likes)
  return sortedBlogs[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
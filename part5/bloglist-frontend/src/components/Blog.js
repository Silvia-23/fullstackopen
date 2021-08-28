import { React, useState } from 'react'

const Blog = ({ blog, increaseLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBloglistAppUser'))

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemoveButtonWhenCreator = {
    display: loggedUser !== null && blog.user.username === loggedUser.username
      ? ''
      : 'none'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  }

  return (
    <div style={blogStyle}  className='blog'>
      {blog.title} by {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>

      <div style={showWhenVisible} className='togglableInfo'>
        <div>
          {blog.url}<br />
          {blog.likes} likes<button onClick={increaseLikes}>like</button><br />
          {blog.user.name}
          <br />
          <button style={showRemoveButtonWhenCreator} onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )}

export default Blog
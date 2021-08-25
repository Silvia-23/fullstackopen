import {React, useState} from 'react'
import Togglable from './Togglable'

const Blog = ({blog, increaseLikes}) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

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
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>

      <div style={showWhenVisible}>
        <div>
          {blog.url}<br />
          {blog.likes} likes<button onClick={increaseLikes}>like</button><br />
          {blog.user.name}
        </div>
      </div>
  </div>  
)}

export default Blog
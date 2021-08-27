import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const localStorageUserKey = 'loggedBloglistAppUser'

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStorageUserKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        localStorageUserKey, JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem(localStorageUserKey)
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <Notification message={errorMessage} isError={true} />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.createBlog(blogObject)

      setBlogs(blogs.concat(blog))
      setNotificationMessage(`New blog: ${blog.title} by ${blog.author} added`)
      setTimeout(() => setNotificationMessage(null), 5000)
    } catch (exception) {
      setErrorMessage('Blog insertion failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const increaseLikesOf = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await blogService
        .updateBlog(id, changedBlog)

      const allBlogs = await blogService.getAll()

      setBlogs(allBlogs)
    } catch (exception) {
      setErrorMessage(
        'Blog update failed'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)

    if (window.confirm(`Remove blog: ${blog.name} by ${blog.author}?`)) {
      try {
        await blogService
          .deleteBlog(id)

        setBlogs(blogs.filter(b => b !== blog))
      } catch (exception) {
        setErrorMessage(
          'Blog update failed'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id !== id))
      }
    }
  }

  return (
    <div>
      <Notification message={errorMessage} isError={true} />

      {user === null ?
        loginForm() :
        <div>
          <Notification message={notificationMessage} isError={false} />
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
        </div>
      }

      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          increaseLikes={() => increaseLikesOf(blog.id)}
          removeBlog={() => removeBlog(blog.id)}
        />)}
    </div>
  )
}

export default App
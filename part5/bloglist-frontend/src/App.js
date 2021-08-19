import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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

  const handleNewBlog = async (event) => {
    event.preventDefault()
    console.log('inserting new blog with: ', blogTitle, blogAuthor, blogUrl)

    try {
      const newBlog = {
        title: blogTitle, author: blogAuthor, url: blogUrl
      }
      const blog = await blogService.createBlog(newBlog)

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setBlogs(blogs.concat(blog))
    } catch (exception) {
      setErrorMessage('Blog insertion failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
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
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>Create New</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            title:
            <input
                type="text"
                value={blogTitle}
                name="BlogTitle"
                onChange={({ target }) => setBlogTitle(target.value)}
              />
          </div>
          <div>
            author:
            <input
                type="text"
                value={blogAuthor}
                name="BlogAuthor"
                onChange={({ target }) => setBlogAuthor(target.value)}
              />
          </div>
          <div>
            url:
            <input
                type="text"
                value={blogUrl}
                name="BlogUrl"
                onChange={({ target }) => setBlogUrl(target.value)}
              />
          </div>
          <button type="submit">create</button>
        </form>
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
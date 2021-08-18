const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let token

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(helper.initialUsers[0].password, 10)

  const user = new User({
    username: helper.initialUsers[0].username,
    passwordHash
  })

  const savedUser = await user.save()

  await api
    .post('/api/login')
    .send(helper.initialUsers[0])
    .then(response => {
      token = `bearer ${response.body.token}`
    })

  await Blog.deleteMany({})
  
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog({
      ...blog,
      user: savedUser._id
    }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blog', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    'TDD harms architecture'
  )
})

test('the unique identifier property of a blog is named id and is defined', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToFetch = blogsAtStart[0]

  expect(blogToFetch.id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 15
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ 'Authorization': token })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).toContain(
    'Test Blog'
  )
})

test('if the likes property is missing from the request it will default to 0', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'www.testurl.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ 'Authorization': token })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes)
    .toEqual(0)
})

test('a blog without title and author is not added', async () => {
  const newBlogWithoutTitle = {
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 15
  }

  const newBlogWithoutAuthor = {
    title: 'Test Title',
    url: 'www.testurl.com',
    likes: 15
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutAuthor)
    .set({ 'Authorization': token })
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .set({ 'Authorization': token })
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog cannot be added if a valid token is not provided', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 15
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ 'Authorization': token })
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const contents = blogsAtEnd.map(blog => blog.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const newBlog = {
    ...blogToUpdate,
    likes: 33
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes)
    .toEqual(newBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
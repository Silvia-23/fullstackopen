const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
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
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes)
    .toEqual(0)
})

test('a blog without title and url is not added', async () => {
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
    .expect(400)

    await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
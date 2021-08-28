import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#blogTitle')
  const authorInput = component.container.querySelector('#blogAuthor')
  const urlInput = component.container.querySelector('#blogUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Blog Title' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Blog Author' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.blogurl.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blog Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Blog Author')
  expect(createBlog.mock.calls[0][0].title).toBe('Blog Title')
})
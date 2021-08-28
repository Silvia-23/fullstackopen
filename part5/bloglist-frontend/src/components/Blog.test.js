import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders author and title, but not additional info by default', () => {
  const blog = {
    name: 'Blog Name',
    author: 'Blog Author',
    likes: 2,
    url: 'www.blogname.it',
    user: {
      name: 'username'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).not.toHaveStyle('display: none')

  const togglableDiv = component.container.querySelector('.togglableInfo')
  expect(togglableDiv).toHaveStyle('display: none')
})
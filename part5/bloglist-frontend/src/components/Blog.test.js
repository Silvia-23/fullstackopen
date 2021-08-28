import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      name: 'Blog Name',
      author: 'Blog Author',
      likes: 2,
      url: 'www.blogname.it',
      user: {
        name: 'username'
      }
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders author and title, but not additional info by default', () => {
    const div = component.container.querySelector('.blog')
    expect(div).not.toHaveStyle('display: none')

    const togglableDiv = component.container.querySelector('.togglableInfo')
    expect(togglableDiv).toHaveStyle('display: none')
  })

  test('after clicking the button, additional info is displayed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableInfo')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.blogname.it2 likeslikeusernameremove')
  })

})
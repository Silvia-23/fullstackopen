describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)

    const user2 = {
      name: 'Random User',
      username: 'randomuser',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
    cy.get('input').get('button').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })

      cy.createBlog({ 
        title: 'Another Title',
        author: 'Blog Author',
        url: 'blog Url',
        likes: 0,
        user: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })

      cy.createBlog({ 
        title: 'Another Title 2',
        author: 'Blog Author',
        url: 'blog Url',
        likes: 5,
        user: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })

      cy.createBlog({ 
        title: 'Another Title 3',
        author: 'Blog Author',
        url: 'blog Url',
        likes: 3,
        user: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#blogTitle').type('Blog Title')
      cy.get('#blogAuthor').type('Blog Author')
      cy.get('#blogUrl').type('www.blogurl.com')

      cy.get('#create-blog-button').click()

      cy.contains('Blog Title by Blog Author')
    })

    it('User can like a blog', function() {
      cy.contains('Another Title by Blog Author')
        .contains('show').click()

      cy.contains('Another Title by Blog Author')
        .contains('like').click()

      cy.contains('Another Title by Blog Author')
        .contains('1 likes')
    })

    it('User who created a blog can delete it', function() {
      cy.contains('Another Title by Blog Author')
        .contains('show').click()

      cy.contains('Another Title by Blog Author')
        .contains('remove').click()

      cy.get('Another Title by Blog Author')
        .should('not.exist')
    })

    it('User who has not created a blog cannot delete it', function() {
      cy.contains('logout').click()

      cy.login({ username: 'randomuser', password: 'salainen' })

      cy.contains('Another Title by Blog Author')
        .contains('show').click()

      cy.contains('Another Title by Blog Author')
        .get('remove').should('not.exist')

      cy.contains('Another Title by Blog Author')
    })

    it('Blogs are ordered by likes descending', function() {
      cy.get('.blog').then( items => {
        cy.wrap(items[0]).contains('show').click()
        cy.wrap(items[1]).contains('show').click()
        cy.wrap(items[2]).contains('show').click()

        cy.wrap(items[0]).contains('5 likes')
        cy.wrap(items[1]).contains('3 likes')
        cy.wrap(items[2]).contains('0 likes')
      })
    })

  })
})
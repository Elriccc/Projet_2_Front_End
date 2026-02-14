import { Register } from "../../src/app/core/models/Register"

describe('Login', () => {
  const user: Register = {
    firstName: "Test",
    lastName: "Test",
    login: "TestUser",
    password: "1234"
  };
  const INCORRECT_PWD: string = 'badpwd';

  before(() => {
    cy.visit('/register')
    cy.get('[data-cy="firstName"]').type(user.firstName)
    cy.get('[data-cy="lastName"]').type(user.lastName)
    cy.get('[data-cy="login"]').type(user.login)
    cy.get('[data-cy="password"]').type(user.password)
  })

  it('register page should exist', () => {
    cy.visit('/register')
    cy.get('[data-cy="title"]').contains('Registration Form')
  })

  it('login page should exist', () => {
    cy.visit('/login')
    cy.get('[data-cy="title"]').contains('Login Form')
  })

  it('login should work', () => {
    cy.visit('/login')
    cy.get('[data-cy="login"]').type(user.login)
    cy.get('[data-cy="password"]').type(user.password)
    cy.get('[data-cy="submitBtn"]').click()
    cy.get('[data-cy="title"]').contains('Students list')
  })

  it("login with incorrect password doesn't work", () => {
    cy.visit('/login')
    cy.get('[data-cy="login"]').type(user.login)
    cy.get('[data-cy="password"]').type(INCORRECT_PWD)
    cy.get('[data-cy="submitBtn"]').click()
    cy.get('[data-cy="title"]').contains('Login Form')
  })

  it("login without password doesn't work", () => {
    cy.visit('/login')
    cy.get('[data-cy="login"]').type(user.login)
    cy.get('[data-cy="submitBtn"]').click()
    cy.get('[data-cy="title"]').contains('Login Form')
  })

  it("login without login doesn't work", () => {
    cy.visit('/login')
    cy.get('[data-cy="password"]').type(user.password)
    cy.get('[data-cy="submitBtn"]').click()
    cy.get('[data-cy="title"]').contains('Login Form')
  })

  it("login without infos doesn't work", () => {
    cy.visit('/login')
    cy.get('[data-cy="submitBtn"]').click()
    cy.get('[data-cy="title"]').contains('Login Form')
  })
})
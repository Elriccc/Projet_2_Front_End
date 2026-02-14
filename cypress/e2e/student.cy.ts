import { Register } from "../../src/app/core/models/Register"
import { Student } from "../../src/app/core/models/Student"

describe('Student', () => {
  const user: Register = {
    firstName: "Test",
    lastName: "Test",
    login: "TestUser",
    password: "1234"
  }
  const student: Student = {
    studentNumber: "000001",
    firstName: "John",
    lastName: "Smith",
    birthDate: "01/02/2000",
    email: "johnsmith@gmail.com",
    phoneNumber: "0606060606",
    subscribeStart: "01/01/2026",
    subscribeEnd: "01/01/2030"
  }

  const deleteAllStudents = () => {
    cy.visit('/students')
    cy.wait('@getAllStudents')
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="deleteBtn"]').length > 0) {
        cy.get('[data-cy="deleteBtn"]', { timeout: 2000 }).then(($buttons) => {
          if ($buttons.length === 0) {
            return
          }
          cy.wrap($buttons.first()).click()
          cy.wait('@deleteStudent', { timeout: 10000 })
          deleteAllStudents()
        })
      }
    })
  }

  const editFirstStudent = () => {
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="editBtn"]').length > 0) {
        cy.get('[data-cy="editBtn"]', { timeout: 2000 }).then(($buttons) => {
          if ($buttons.length === 0) {
            return
          }
          cy.wrap($buttons.first()).click()
        })
      }
    })
  }

  before(() => {
    cy.visit('/register')
    cy.get('[data-cy="firstName"]').type(user.firstName)
    cy.get('[data-cy="lastName"]').type(user.lastName)
    cy.get('[data-cy="login"]').type(user.login)
    cy.get('[data-cy="password"]').type(user.password)
  })

  beforeEach(() => {
    cy.intercept('DELETE', '**/api/student/*').as('deleteStudent')
    cy.intercept('GET', '**/api/student').as('getAllStudents')
    cy.intercept('POST', '**/api/login').as('loginUser')

    cy.visit('/login')
    cy.get('[data-cy="login"]').type(user.login)
    cy.get('[data-cy="password"]').type(user.password)
    cy.get('[data-cy="submitBtn"]').click()
    cy.wait('@loginUser')

    deleteAllStudents()
    cy.get('[data-cy="emptyState"]').should('be.visible')
  })

  it('students page should be accessible and empty', () => {
    cy.visit('/students')
    cy.get('[data-cy="title"]').contains('Students list')
    cy.get('[data-cy="emptyState"]').should("be.visible")
  })

  it('cancel student creation', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="cancelBtn"]').click()
    cy.get('[data-cy="title"]').contains('Students list')
    cy.get('[data-cy="emptyState"]').should("be.visible")
  })

  it('create a new student that already exist', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="studentNumber"]').type(student.studentNumber)
    cy.get('[data-cy="firstName"]').type(student.firstName)
    cy.get('[data-cy="lastName"]').type(student.lastName)
    cy.get('[data-cy="birthDate"]').type('2000-02-01')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Students list')
    cy.get('[data-cy="emptyState"]').should("not.exist")

    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="studentNumber"]').type(student.studentNumber)
    cy.get('[data-cy="firstName"]').type(student.firstName)
    cy.get('[data-cy="lastName"]').type(student.lastName)
    cy.get('[data-cy="birthDate"]').type('2000-02-01')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
  })

  it('create a new student with no infos', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
  })

  it('create a new student with no infos', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
  })

  it('create a new student with no student number', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="firstName"]').type(student.firstName)
    cy.get('[data-cy="lastName"]').type(student.lastName)
    cy.get('[data-cy="birthDate"]').type('2000-02-01')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
  })

  it('create a new student with no first name', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="studentNumber"]').type(student.studentNumber)
    cy.get('[data-cy="lastName"]').type(student.lastName)
    cy.get('[data-cy="birthDate"]').type('2000-02-01')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
  })

  it('create a new student with no last name', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="studentNumber"]').type(student.studentNumber)
    cy.get('[data-cy="firstName"]').type(student.firstName)
    cy.get('[data-cy="birthDate"]').type('2000-02-01')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
  })

  it('create a new student with no birth date', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="studentNumber"]').type(student.studentNumber)
    cy.get('[data-cy="firstName"]').type(student.firstName)
    cy.get('[data-cy="lastName"]').type(student.lastName)
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
  })

  it('create a new student with valid infos', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="studentNumber"]').type(student.studentNumber)
    cy.get('[data-cy="firstName"]').type(student.firstName)
    cy.get('[data-cy="lastName"]').type(student.lastName)
    cy.get('[data-cy="birthDate"]').type('2000-02-01')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Students list')
    cy.get('[data-cy="emptyState"]').should("not.exist")
  })

  it('delete a student', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="studentNumber"]').type(student.studentNumber)
    cy.get('[data-cy="firstName"]').type(student.firstName)
    cy.get('[data-cy="lastName"]').type(student.lastName)
    cy.get('[data-cy="birthDate"]').type('2000-02-01')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Students list')
    cy.get('[data-cy="emptyState"]').should("not.exist")
    deleteAllStudents()
    cy.get('[data-cy="emptyState"]').should("be.visible")
  })

  it('edit student with valid infos', () => {
    cy.visit('/students')
    cy.get('[data-cy="newStudentBtn"]').click()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="studentNumber"]').type(student.studentNumber)
    cy.get('[data-cy="firstName"]').type(student.firstName)
    cy.get('[data-cy="lastName"]').type(student.lastName)
    cy.get('[data-cy="birthDate"]').type('2000-02-01')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="title"]').contains('Students list')
    cy.get('[data-cy="emptyState"]').should("not.exist")
    editFirstStudent()
    cy.get('[data-cy="title"]').contains('Student Form')
    cy.get('[data-cy="phoneNumber"]').type(student.phoneNumber)
    cy.get('[data-cy="email"]').type(student.email)
    cy.get('[data-cy="subscribeStart"]').type('2027-01-01')
    cy.get('[data-cy="subscribeEnd"]').type('2030-01-01')
    cy.get('[data-cy="saveBtn"]').click()
    cy.get('[data-cy="emptyState"]').should("not.exist")
  })
})
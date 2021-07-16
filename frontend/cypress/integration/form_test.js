describe('Checking all form inputs and submit button', () => {
    const nameInput = () => cy.get('[name="user"]')
    const emailInput = () => cy.get('[name="email"]')
    const pwdInput = () => cy.get('[name="password"]')

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('renders properly', () => {
        nameInput().should('exist')
        emailInput().should('exist')
        pwdInput().should('exist')
    })

    it('can type in inputs', () => {
        const name = 'Monica'
        const email = 'madmonnie@gmail.com'
        const password = 'wordpass'

        nameInput().type(name).should('have.value', name)
        emailInput().type(email).should('have.value', email)
        pwdInput().type(password).should('have.value', password)
    })

    it('can accept ToS', () => {
        cy.get('[type="checkbox"]').check()
        cy.get('[type="checkbox"]').should('be.checked')
    })

    it('can submit form', () => {
        cy.get('form').submit
    })

    it('cannot submit empty form', () => {
        nameInput().clear()
        cy.get('[type="submit"]').should('be.disabled')
    })
})
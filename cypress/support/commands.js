Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'João',
    lastName: 'Lopes',
    email: 'Joaquim@jonas.com.br',
    text: 'Teste Cypress Nuvens'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})
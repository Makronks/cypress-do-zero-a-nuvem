describe('Central de Atendimento ao Cliente TAT' , () =>{

    beforeEach(() => {
        cy.visit('./src/index.html')

    });

    it(' verificar o título da aplicação', () => {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
        cy.get('#firstName').type('Joaquim')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('joaquim@projeto.com.br')
        cy.get('#open-text-area').type(longText ,{ delay: 0 })
        cy.get('button[type="submit"]').click()

    

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

        
        cy.get('#firstName').type('Joaquim')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('joaquimprojeto.com.br')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

       cy.get('.error').should('be.visible')
    })

    it('campo de telefone contunua vazuo quando preenchido com um valor não-númeruco', () => {
        cy.get('#phone')
            .type('abcde')
            .should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Joaquim')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('joaquimprojeto.com.br')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()

       cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Joaquim')
            .should('have.value', 'Joaquim')
            .clear().should('have.value', '')

        cy.get('#lastName')
            .type('Lopes')
            .should('have.value', 'Lopes')
            .clear().should('have.value', '')

        cy.get('#email')    
            .type('joaquim@projeto.com.br')
            .should('have.value','joaquim@projeto.com.br')
            .clear().should('have.value', '')

        cy.get('#open-text-area')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear().should('have.value', '')
        cy.get('#phone')
            .type(12345678)
            .should('have.value', '12345678')
            .clear().should('have.value', '')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', () =>{
     
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success')
        .should('be.visible')
    })
    
    it('seleciona um produto -  YouTube)', () =>{
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube')
    })

    it('seleciona um produto - Mentoria', () =>{
        cy.get('#product')
            .select('Mentoria')
            .should('have.value','mentoria')
    })

    it('seleciona um produto - Mentoria', () =>{
        cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })

    it('marca o tipo de atendimento - Feedback', () =>{
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
            

    })
    it('marca o tipo de atendimento', () =>{

        cy.get('input[type="radio"]')
           .each(typeofService =>{
            cy.wrap(typeofService)
                .check()
                .should('be.checked')
           }) 

    })
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()  
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
      
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
         })
    })     
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
        cy.contains('a','Política de Privacidade')
            .should('have.attr','href','privacy.html')
            .and('have.attr', 'target', '_blank')
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
        cy.contains('a','Política de Privacidade')
            .invoke('removeAttr', 'target')
            .click()
         
        cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')  
    })
    
})
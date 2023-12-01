
describe('Browser demo',() => {
    beforeEach(() => {
        cy.on('uncaught:exception', err => {
            return false;
        })
    });
    
    it.skip('Get browser info', () => {
        cy.visit('https://www.whatismybrowser.com/')
        cy.log(Cypress.browser.name)
        cy.log(Cypress.browser.family)
        cy.log(Cypress.browser.isHeaded)
        cy.log(Cypress.browser.isHeadless)
    })

    it.skip('Get DOM info', () => {
        cy.visit('https://demoqa.com/accordian')
        cy.get('.collapse').eq(6).then(($elem) => {
           cy.log(Cypress.dom.isVisible($elem))
        })
    })

    it.skip('Set Keystroke delay', {keystrokeDelay : 100},() => {
        cy.visit('https://www.saucedemo.com')
        cy.get('#user-name').type('testtestetest')
    })

    it.skip('Multi domains test',() => {
        cy.visit('https://demoqa.com/accordian')
        cy.get('.collapse').eq(6)
        cy.visit('https://www.whatismybrowser.com/')
        cy.log(Cypress.browser.name)
    })
    it.skip('Multi domains test',() => {
        const dataTransfer = new DataTransfer
        cy.visit('https://practice.expandtesting.com/drag-and-drop')
        cy.get('#column-a').trigger('dragstart', {DataTransfer})
        cy.get('#column-b').trigger('drop', {DataTransfer})
        
    })

    it('viewport',()=>{
        cy.visit('https://demoqa.com/accordian')
        cy.scrollTo('bottom', { ensureScrollable: false })

    })
})
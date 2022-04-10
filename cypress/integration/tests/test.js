describe('Navbar Text Test', () => {
    it('make sure Navbar contains correct text', () => {
        cy.visit('localhost:3000')
        cy.get('.navbar-title').should('have.text', 'Anchor Editor')
    })
})

describe('Upload File Test', () => {
    it('upload file', () => {
        cy.get("input[type=file]").attachFile('123.xml')

        cy.get('.upload-file-button').click()

        cy.get('.upload-text-button').click()
    })
})

describe('Get Text Test', () => {
    it('get text', () => {
        cy.get('.get-text-button').click()

        cy.get('.text-content').contains('Bonjour')
    })
})

describe('CRUD Anchors Test', () => {
    it('get anchors', () => {
        cy.get('.get-anchors-button').click()

        cy.get('.anchors-list').find('li').should('have.length', 6)

        cy.get('.anchor-timestamp-info').contains('3.6s')

        cy.get('.anchor-location-info').contains('55')
    })
    it('update anchor', () => {
        cy.get('.update-anchor-button').click()

        cy.get('.anchors-list').find('li').should('have.length', 6)

        cy.get('.anchor-timestamp-info').should('not.contain', '3.6s')

        cy.get('.anchor-timestamp-info').contains('7.2s')

        cy.get('.anchor-location-info').contains('72')
    })
    it('delete anchor', () => {
        cy.get('.delete-anchor-button').click()

        cy.get('.anchors-list').find('li').should('have.length', 5)

        cy.get('.anchor-timestamp-info').should('not.contain', '7.2s')
    })
    it('post anchor', () => {
        cy.get('.post-anchor-button').click()

        cy.get('.anchors-list').find('li').should('have.length', 6)

        cy.get('.anchor-timestamp-info').contains('8.8s')

        cy.get('.anchor-location-info').contains('88')
    })
})



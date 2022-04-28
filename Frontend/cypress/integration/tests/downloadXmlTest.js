describe('Download XML file test', () => {
    it('make sure the user can download the updated XML file', () => {
        cy.visit('localhost:3000')
        cy.get('.download-button').click();
        cy.verifyDownload('NewFile.xml');
    })
})
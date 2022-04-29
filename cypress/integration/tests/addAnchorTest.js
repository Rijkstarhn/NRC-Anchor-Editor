describe("The Start Page", () => {
    it("successfully loads", () => {
        cy.visit("localhost:3000");
    });
});

describe("Upload File", () => {
    it("upload xml", () => {
        cy.get("[id=inputGroupFile04]").attachFile("123.xml");

        cy.get(".upload-file-button").click();

        cy.get(".text-content").contains("Bonjour");
    });

    it("upload audio", () => {
        cy.get("[id=file-input-audio]").attachFile("ej-fra.mp3");

        cy.get(".upload-file-button-audio").click();
    });
});

describe("Add Anchor", () => {
    it("spans are not clickable in default mode", () => {
        cy.get(".location-12").click();

        cy.get(".location-12").should("have.css");
    });

    it("click add anchor button and the spans in text area turns clickable", () => {
        cy.get("[id=add_anchor_button]").click();

        cy.get(".location-12").click();

        cy.get(".location-12").should(
            "have.css",
            "background-color",
            "rgb(255, 0, 0)"
        );
    });
});

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
    it("click span in default mode, and it should not change color", () => {
        cy.get(".location-12").should(
            "have.css",
            "background-color",
            "rgba(0, 0, 0, 0)"
        );

        cy.get(".location-12").click();

        cy.get(".location-12").should(
            "have.css",
            "background-color",
            "rgba(0, 0, 0, 0)"
        );
    });

    it("click add anchor button and the spans in text area turns clickable to red", () => {
        cy.get("[id=add_anchor_button]").click();

        cy.get(".location-12").click();

        cy.get(".location-12").should(
            "have.css",
            "background-color",
            "rgb(255, 0, 0)"
        );
    });

    it("click save button and save the anchor", () => {
        cy.get("[id=save-button]").click();

        cy.get(".location-12").should(
            "have.css",
            "background-color",
            "rgb(255, 0, 0)"
        );

        cy.get(".location-12").should("have.class", "anchor");
    });
});

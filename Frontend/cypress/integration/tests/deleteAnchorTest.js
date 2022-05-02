describe("The Start Page", () => {
    it("successfully loads", () => {
        cy.visit("localhost:3000");
    });
});

// test upload xml and audio
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

// test delete first anchor at {"timestamp": ".5s", "location": 0}
describe("Delete Anchor", () => {
    it("the first anchor from 123.xml file should show red in default mode", () => {
        cy.get(".location-0").should(
            "have.css",
            "background-color",
            "rgb(255, 0, 0)"
        );

        cy.get(".location-0").click();

        cy.get(".location-0").should(
            "have.css",
            "background-color",
            "rgb(255, 0, 0)"
        );
    });

    it("test click Delete Anchor button, first anchor should turn green in deletion mode", () => {
        cy.get("[id=delete_anchor_button]").click();
        cy.get(".location-0").should(
            "have.css",
            "background-color",
            "rgb(255, 0, 0)"
        );
        cy.get(".location-0").click();
        cy.get(".location-0").should(
            "have.css",
            "background-color",
            "rgb(0, 128, 0)"
        );
    });

    it("click save button and the anchor is removed", () => {
        cy.get("[id=save-button]").click();

        cy.get(".location-0").should(
            "have.css",
            "background-color",
            "rgba(0, 0, 0, 0)"
        );

        cy.get(".location-0").should("not.contain", "anchor");
    });
});
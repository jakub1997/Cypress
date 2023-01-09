import "cypress-iframe"

describe("Handling Frames", ()=>{

    it("Approach_1", ()=>{

        cy.visit("https://the-internet.herokuapp.com/iframe");

        const iframe = cy.get("#mce_0_ifr")
            .its("0.contentDocument.body")
            .should("be.visible")
            .then(cy.wrap);

            iframe.clear().type("Welcome {ctrl+a}");

            cy.get("button[title='Bold']").click();


    })

    it("Approach_2 By using custom command", ()=>{

        cy.visit("https://the-internet.herokuapp.com/iframe");

        cy.getIframe("#mce_0_ifr").clear().type("Welcome {ctrl+a}");

            cy.get("button[title='Bold']").click();
    })

    it.only("Approach_ By using cypress iframe plugin", ()=>{

        cy.visit("https://the-internet.herokuapp.com/iframe");

        cy.frameLoaded("#mce_0_ifr");
        cy.iframe("#mce_0_ifr").clear().type("Hello!")
    })



})
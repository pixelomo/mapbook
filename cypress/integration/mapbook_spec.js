describe("MapBook Test", function() {
  it("Login", function() {
    cy.visit("http://localhost:3002");
    
    cy.get("h1 #logo")
      .should('have.css', 'width', '320px');

    cy.get(".mapwrap")
      .should('have.css', 'position', 'relative')

    cy.get(".addressbook")
      .should('have.css', 'min-width', '200px')

    cy.get("#autocomplete")
      .type("33 Beverly Park Road, Beverly Hills, CA, USA")
      .should("have.value", "33 Beverly Park Road, Beverly Hills, CA, USA")
      .wait(1000)
      .type('{downarrow}')
      .type('{enter}')
      .wait(1000)
      .get("#name")
      .type("Johnny Howell")
      .get("#notes")
      .type("Colleague")
      .get(".submit").click()
      .get(".addressbook ul li:nth-of-type(4) .text strong")
      .contains("Johnny Howell")

    cy.get("#autocomplete")
      .type("44 Sunset Boulevard")
      .wait(1000)
      .type('{downarrow}')
      .type('{enter}')
      .wait(1000)
      .get("#name")
      .type("Kate Summers")
      .get("#notes")
      .type("Works in guitar shop")
      .get(".submit").click()
      .get(".addressbook ul li:last-of-type .text")
      .contains("44 Sunset Blvd")
  });
});

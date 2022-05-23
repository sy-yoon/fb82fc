/// <reference types="cypress" />

const alice = {
    username: "Alice1",
    email: "alice1@example.com",
    password: "Z6#6%xfLTarZ9U",
  };
  const bob = {
    username: "Bob1",
    email: "bob1@example.com",
    password: "L%e$xZHC4QKP@F",
  };
  
  describe("Feature: Implement a read status for messages", () => {
    it("setup", () => {
      cy.signup(alice.username, alice.email, alice.password);
      cy.logout();
      cy.signup(bob.username, bob.email, bob.password);
      cy.logout();
    });
  
    it("sends message in a new conversation and Check read status ", () => {
      cy.login(alice.username, alice.password);

      cy.get("input[name=search]").type("Bob1");
      cy.contains("Bob1").click();
  
      cy.get("input[name=text]").type("First message{enter}");
      cy.get("input[name=text]").type("Second message{enter}");
      cy.get("input[name=text]").type("Third message{enter}");
      cy.logout();

      cy.reload();
      cy.login(bob.username, bob.password);

      cy.contains('3').should('have.class', 'MuiBadge-badge')
    });
  });
  
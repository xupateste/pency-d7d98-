describe("User filters", () => {
  beforeEach(() => {
    window.localStorage.setItem("onboarding:Products", "completed");
  });

  describe("criteria", () => {
    it("should filter by criteria", () => {
      cy.visit("/");

      cy.get(`[data-test-id="product"]`).should("have.length", 3);
      cy.get(`[data-test-id="filters"] input`).type("con categoria");
      cy.get(`[data-test-id="product"]`).should("have.length", 1);
    });

    it("should filter by criteria being case insensitive", () => {
      cy.visit("/");

      cy.get(`[data-test-id="filters"] input`).type("con CategOria");
      cy.get(`[data-test-id="product"]`).should("have.length", 1);
    });

    it("should show a message when no products were found", () => {
      cy.visit("/");

      cy.get(`[data-test-id="filters"] input`).type("this should not match");
      cy.get(`[data-test-id="product"]`).should("have.length", 0);
      cy.get(`[data-test-id="empty"]`).should("be.visible");
    });
  });

  describe("category", () => {
    it("should filter by category", () => {
      cy.visit("/");

      cy.get(`[data-test-id="filters"] select`).select("solitario");
      cy.get(`[id="solitario"] [data-test-id="title"]`).should("be.visible");
    });
  });
});

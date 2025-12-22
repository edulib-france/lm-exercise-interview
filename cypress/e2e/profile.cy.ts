describe("Profile Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate from Home to Profile page", () => {
    // Verify we are on Home page
    cy.contains("Go to Profile").should("be.visible");

    // Click navigation button
    cy.contains("Go to Profile").click();

    // Verify navigation to Profile page
    cy.url().should("include", "/profile");
  });

  it("should display user profile information", () => {
    cy.contains("Go to Profile").click();

    // Verify profile content is visible
    cy.contains("Youssouf SOKHONA").should("be.visible");
    cy.contains("Senior Developer").should("be.visible");
    cy.contains("youssouf28.sok@gmail.com").should("be.visible");
  });

  it("should display PlatformInfo component", () => {
    cy.contains("Go to Profile").click();

    // Verify PlatformInfo exists in DOM and contains expected content
    cy.get('[data-testid="platform-info"]').should("exist");
    cy.get('[data-testid="platform-info"]')
      .contains("Platform Features")
      .should("exist");
  });

  it("should navigate back to Home page", () => {
    cy.contains("Go to Profile").click();
    cy.url().should("include", "/profile");

    // Click back button
    cy.get("ion-back-button").click();

    // Verify we are back on Home
    cy.url().should("include", "/home");
  });
});

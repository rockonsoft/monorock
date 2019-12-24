describe('rockme-api', () => {
  //beforeEach(() => cy.server());

  it('should wait for me', () => {
    cy.server();
    cy.route('**/api/profile').as('profile');
    cy.visit('/');
    cy.wait(['@me'], { requestTimeout: 10000 }).then(xhr => {
      // we can now access the low level xhr
      // that contains the request body,
      // response body, status, etc
      xhr.values;
    });
  });
});

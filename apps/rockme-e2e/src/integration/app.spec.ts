import { getGreeting } from '../support/app.po';

describe('rockme', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    const top = cy.get('.top-bar-title');
    top.contains('Monorock Demo!');
  });
});

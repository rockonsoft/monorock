import { getGreeting } from '../support/app.po';

describe('rockme', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to rockme!');
  });
});

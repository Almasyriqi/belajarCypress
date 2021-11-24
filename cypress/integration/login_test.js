describe('Test Login', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });
    
    it('Success Login', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type("secret_sauce");
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html')
    });

    it('Empty username and password', () => {
        cy.get('#login-button').click();
        cy.get('#user-name').should('have.class', 'error');
        cy.get('#password').should('have.class', 'error');
        cy.get('h3').contains('Epic sadface: Username is required').should('have.attr', 'data-test', 'error');
    });

    it('Empty username', () => {
        cy.get('#password').type("secret_sauce");
        cy.get('#login-button').click();
        cy.get('#user-name').should('have.class', 'error');
        cy.get('#password').should('have.class', 'error');
        cy.get('h3').contains('Epic sadface: Username is required').should('have.attr', 'data-test', 'error');
    });

    it('Empty password', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#login-button').click();
        cy.get('#user-name').should('have.class', 'error');
        cy.get('#password').should('have.class', 'error');
        cy.get('h3').contains('Epic sadface: Password is required').should('have.attr', 'data-test', 'error');
    });

    it('invalid username and password', () => {
        cy.get('#user-name').type('coba');
        cy.get('#password').type("coba");
        cy.get('#login-button').click();
        cy.get('#user-name').should('have.class', 'error');
        cy.get('#password').should('have.class', 'error');
        cy.get('h3').contains('Epic sadface: Username and password do not match any user in this service').should('have.attr', 'data-test', 'error');
    });

    it('invalid username and valid password', () => {
        cy.get('#user-name').type('coba');
        cy.get('#password').type("secret_sauce");
        cy.get('#login-button').click();
        cy.get('#user-name').should('have.class', 'error');
        cy.get('#password').should('have.class', 'error');
        cy.get('h3').contains('Epic sadface: Username and password do not match any user in this service').should('have.attr', 'data-test', 'error');
    });

    it('valid username and invalid password', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type("coba");
        cy.get('#login-button').click();
        cy.get('#user-name').should('have.class', 'error');
        cy.get('#password').should('have.class', 'error');
        cy.get('h3').contains('Epic sadface: Username and password do not match any user in this service').should('have.attr', 'data-test', 'error');
    });
  })
describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user = {
            name: 'Fabio Kim',
            username: 'fabio',
            password: 'tonyromo',
        };
        cy.request('POST', 'http://localhost:3001/api/users/', user);
        cy.visit('http://localhost:3000');
    });

    // it.only('login fails with wrong password', function () {
    //     cy.contains('login').click();
    //     cy.get('#username').type('fabio');
    //     cy.get('#password').type('wrong');
    //     cy.get('#login-button').click();

    //     cy.get('.error').should('contain', 'Wrong Credentials').and('have.css', 'color', 'rgb(255, 0, 0)').and('have.css', 'border-style', 'solid');
    // });
    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'fabio', password: 'tonyromo' });
        });
        describe('and several notes exist', function () {
            beforeEach(function () {
                cy.createNote({ content: 'first note', important: false });
                cy.createNote({ content: 'second note', important: false });
                cy.createNote({ content: 'third note', important: false });
            });

            it('one of those can be made important', function () {
                cy.contains('second note').contains('make important').click();

                cy.contains('second note').contains('make not important');
            });
        });
    });
});

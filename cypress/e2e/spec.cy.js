describe('testing spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('passes', () => {
    // Initial text
    cy.contains('Book Tracker', { matchCase: false }).should('exist');
    cy.contains('Add book acquired', { matchCase: false }).should('exist');
    cy.contains('Add book read', { matchCase: false }).should('exist');

    // Selecting a year
    cy.get('select').select('2023');
    cy.contains('Total books acquired in 2023 is: 3', {
      matchCase: false,
    }).should('exist');
    cy.contains('Total books read in 2023 is: 2', { matchCase: false }).should(
      'exist',
    );
    cy.contains('Total books acquired in 2023 but not read is: 2', {
      matchCase: false,
    }).should('exist');
    cy.contains('Total books read in 2023 acquired in a previous year is: 1', {
      matchCase: false,
    }).should('exist');
    cy.contains('Submit book', { matchCase: false }).should('not.exist');

    // Add book acquired
    cy.get('button').first().click();
    cy.contains('Choose a year to add a book to:', { matchCase: false }).should(
      'exist',
    );
    cy.contains('Submit book', { matchCase: false }).should('not.exist');
    cy.get('select').eq(1).select('2022');
    cy.contains('Type in title and author', { matchCase: false }).should(
      'exist',
    );
    cy.contains('Submit book', { matchCase: false }).should('exist');
    cy.get('input').type('A book');
    cy.get('button').eq(2).click();
    cy.contains('Book submitted!', { matchCase: false }).should('exist');

    // Add book read from dropdown
    cy.get('button').eq(1).click();
    cy.contains('Choose a year to add a book to:', { matchCase: false }).should(
      'exist',
    );
    cy.contains('Submit book', { matchCase: false }).should('not.exist');
    cy.get('select').eq(1).select('2024');
    cy.contains("Select the book you've read", { matchCase: false }).should(
      'not.exist',
    );
    cy.contains('Submit book', { matchCase: false }).should('exist');
    cy.get('select').eq(1).select('2022');
    cy.contains("Select the book you've read", { matchCase: false }).should(
      'exist',
    );
    cy.contains('Submit book', { matchCase: false }).should('not.exist');
    cy.get('select').eq(2).select('Undoctored by Adam Kay');
    cy.contains('Submit book', { matchCase: false }).should('exist');
    cy.get('button').eq(2).click();
    cy.contains('Book submitted!', { matchCase: false }).should('exist');

    // Add book read from input
    cy.get('button').eq(1).click();
    cy.contains('Choose a year to add a book to:', { matchCase: false }).should(
      'exist',
    );
    cy.contains('Submit book', { matchCase: false }).should('not.exist');
    cy.get('select').eq(1).select('2024');
    cy.contains("Select the book you've read", { matchCase: false }).should(
      'not.exist',
    );
    cy.contains('Submit book', { matchCase: false }).should('exist');
    cy.get('select').eq(1).select('2022');
    cy.contains("Select the book you've read", { matchCase: false }).should(
      'exist',
    );
    cy.contains('Submit book', { matchCase: false }).should('not.exist');
    cy.get('select').eq(2).select('- Not acquired this year -');
    cy.contains('Type in title and author', { matchCase: false }).should(
      'exist',
    );
    cy.contains('Submit book', { matchCase: false }).should('exist');
    cy.get('input').type('Another book');
    cy.get('button').eq(2).click();
    cy.contains('Book submitted!', { matchCase: false }).should('exist');
  });
});

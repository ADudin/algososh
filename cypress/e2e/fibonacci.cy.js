import { fibonacciURL, circleComponentState } from "../utils/constants";

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('fibonacci page should work correctly', () => {
  const testNumber = 4;

  beforeEach(() => {
    cy.visit(fibonacciURL);
  });

  it('should render button with empty input field correctly', () => {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  });

  it('should render numbers correctly', () => {
    cy.get('input').type(testNumber).should('have.value', testNumber);
    cy.get('[data-testid="submitButton"]').click();

    cy.clock();

    cy.get(circleComponentState.letter).eq(0).should('have.text', '1');
    cy.get(circleComponentState.letter).should('have.length', 1);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.letter).eq(0).should('have.text', '1');
    cy.get(circleComponentState.letter).eq(1).should('have.text', '1');
    cy.get(circleComponentState.letter).should('have.length', 2);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.letter).eq(0).should('have.text', '1');
    cy.get(circleComponentState.letter).eq(1).should('have.text', '1');
    cy.get(circleComponentState.letter).eq(2).should('have.text', '2');
    cy.get(circleComponentState.letter).should('have.length', 3);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.letter).eq(0).should('have.text', '1');
    cy.get(circleComponentState.letter).eq(1).should('have.text', '1');
    cy.get(circleComponentState.letter).eq(2).should('have.text', '2');
    cy.get(circleComponentState.letter).eq(3).should('have.text', '3');
    cy.get(circleComponentState.letter).should('have.length', 4);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.letter).eq(0).should('have.text', '1');
    cy.get(circleComponentState.letter).eq(1).should('have.text', '1');
    cy.get(circleComponentState.letter).eq(2).should('have.text', '2');
    cy.get(circleComponentState.letter).eq(3).should('have.text', '3');
    cy.get(circleComponentState.letter).eq(4).should('have.text', '5');
    cy.get(circleComponentState.letter).should('have.length', 5);
  });
});
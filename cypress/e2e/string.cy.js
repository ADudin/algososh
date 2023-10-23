import {
  recursionURL,
  COLORS,
  circleComponentState
} from "../utils/constants";

import { DELAY_IN_MS } from "../../src/constants/delays";

describe('string component should work correctly', () => {
  const testString = '1234';

  beforeEach(() => {
    cy.visit(recursionURL);
  });

  it('should render button with empty input field correctly', () => {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  });

  it('should render reversing algorithm correctly at each step', () => {
    cy.get('input').type(testString).should('have.value', testString);
    cy.get('[data-testid="submitButton"]').click();

    cy.clock();
    
    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.changing).should('have.text', testString[0]);
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', testString[1]);
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.default).should('have.text', testString[2]);
    cy.get(circleComponentState.color).eq(3).should('have.css', 'border-color', COLORS.changing).should('have.text', testString[3]);

    cy.tick(DELAY_IN_MS);
    
    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.modified).should('have.text', testString[3]);
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.changing).should('have.text', testString[1]);
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.changing).should('have.text', testString[2]);
    cy.get(circleComponentState.color).eq(3).should('have.css', 'border-color', COLORS.modified).should('have.text', testString[0]);

    cy.tick(DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.modified).should('have.text', testString[3]);
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.modified).should('have.text', testString[2]);
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.modified).should('have.text', testString[1]);
    cy.get(circleComponentState.color).eq(3).should('have.css', 'border-color', COLORS.modified).should('have.text', testString[0]);
  });
});
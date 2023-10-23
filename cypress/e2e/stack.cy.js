import { 
  stackURL,
  COLORS,
  circleComponentState
} from "../utils/constants";

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('stack page should work correctly', () => {
  beforeEach(() => {
    cy.visit(stackURL);
  });

  it('should render buttons with empty input field correctly', () => {
    cy.get('input').clear();
    cy.get('[data-testid="addButton"]').should('be.disabled');
    cy.get('[data-testid="removeButton"]').should('be.disabled');
    cy.get('[data-testid="resetButton"]').should('be.disabled');
  });

  it('should add items to stack correctly', () => {
    cy.get('input').type('1').should('have.value', '1');
    cy.get('[data-testid="addButton"]').click();

    cy.clock();

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.changing).should('have.text', '1');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'top');
    cy.get('[data-testid="removeButton"]').not('be.disabled');
    cy.get('[data-testid="resetButton"]').not('be.disabled');
    
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 1);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('input').type('2').should('have.value', '2');
    cy.get('[data-testid="addButton"]').click();
    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.changing).should('have.text', '2');
    cy.get(circleComponentState.head).eq(1).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 2);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '2');
    cy.get(circleComponentState.head).eq(1).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 2);
    

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('input').type('3').should('have.value', '3');
    cy.get('[data-testid="addButton"]').click();
    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '2');
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.changing).should('have.text', '3');
    cy.get(circleComponentState.head).eq(2).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 3);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '2');
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.default).should('have.text', '3');
    cy.get(circleComponentState.head).eq(2).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 3);
  });

  it('should remove items from stack correctly', () => {
    cy.get('input').type('1').should('have.value', '1');
    cy.get('[data-testid="addButton"]').click();
    cy.get('input').type('2').should('have.value', '2');
    cy.get('[data-testid="addButton"]').click();
    cy.get('input').type('3').should('have.value', '3');
    cy.get('[data-testid="addButton"]').click();

    cy.clock();

    cy.get('[data-testid="removeButton"]').click();
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.changing).should('have.text', '3');
    cy.get(circleComponentState.head).eq(2).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 3);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '2');
    cy.get(circleComponentState.head).eq(1).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 2);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-testid="removeButton"]').click();
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.changing).should('have.text', '2');
    cy.get(circleComponentState.head).eq(1).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 2);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 1);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-testid="removeButton"]').click();
    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.changing).should('have.text', '1');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'top');
    cy.get(circleComponentState.color).should('have.length', 1);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).should('have.length', 0);
  });

  it('should reset stack correctly', () => {
    cy.get('input').type('1').should('have.value', '1');
    cy.get('[data-testid="addButton"]').click();
    cy.get('input').type('2').should('have.value', '2');
    cy.get('[data-testid="addButton"]').click();
    cy.get('input').type('3').should('have.value', '3');
    cy.get('[data-testid="addButton"]').click();

    cy.get(circleComponentState.color).should('have.length', 3);

    cy.get('[data-testid="resetButton"]').click();

    cy.get(circleComponentState.color).should('have.length', 0);
  });
});
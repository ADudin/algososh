import { 
  queueURL,
  COLORS,
  circleComponentState
} from "../utils/constants";

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const MAX_QUEUE_LENGTH = 7;

describe('queue page should work correctly', () => {
  beforeEach(() => {
    cy.visit(queueURL);
  });

  it('should render buttons with empty input field correctly', () => {
    cy.get('input').clear();
    cy.get('[data-testid="addButton"]').should('be.disabled');
    cy.get('[data-testid="removeButton"]').should('be.disabled');
    cy.get('[data-testid="resetButton"]').should('be.disabled');
  });

  it('should add items to queue correctly', () => {
    cy.get('input').type('1').should('have.value', '1');
    cy.get('[data-testid="addButton"]').click();

    cy.clock();

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.changing).should('have.text', '1');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(0).should('have.text', 'tail');
    cy.get('[data-testid="removeButton"]').not('be.disabled');
    cy.get('[data-testid="resetButton"]').not('be.disabled');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(0).should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('input').type('2').should('have.value', '2');
    cy.get('[data-testid="addButton"]').click();
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.changing).should('have.text', '2');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(1).should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '2');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(1).should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('input').type('3').should('have.value', '3');
    cy.get('[data-testid="addButton"]').click();
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.changing).should('have.text', '3');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(2).should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.default).should('have.text', '3');
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '2');
    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(2).should('have.text', 'tail');
  });

  it('should remove items from queue correctly', () => {
    cy.get('input').type('1').should('have.value', '1');
    cy.get('[data-testid="addButton"]').click();
    cy.get('input').type('2').should('have.value', '2');
    cy.get('[data-testid="addButton"]').click();
    cy.get('input').type('3').should('have.value', '3');
    cy.get('[data-testid="addButton"]').click();

    cy.clock();

    cy.get('[data-testid="removeButton"]').click();
    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.changing).should('have.text', '1');
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '2');
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.default).should('have.text', '3');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(2).should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '');
    cy.get(circleComponentState.head).eq(1).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(2).should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-testid="removeButton"]').click();
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.changing).should('have.text', '2');
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.default).should('have.text', '3');
    cy.get(circleComponentState.head).eq(1).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(2).should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '');
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.default).should('have.text', '3');
    cy.get(circleComponentState.head).eq(2).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(2).should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-testid="removeButton"]').click();
    cy.get(circleComponentState.letter).should('have.text', '').should('have.length', MAX_QUEUE_LENGTH);
    cy.get(circleComponentState.head).should('have.text', '').should('have.length', MAX_QUEUE_LENGTH);
    cy.get(circleComponentState.tail).should('have.text', '').should('have.length', MAX_QUEUE_LENGTH);
  });

  it('should reset queue correctly', () => {
    cy.get('input').type('1').should('have.value', '1');
    cy.get('[data-testid="addButton"]').click();
    cy.get('input').type('2').should('have.value', '2');
    cy.get('[data-testid="addButton"]').click();
    cy.get('input').type('3').should('have.value', '3');
    cy.get('[data-testid="addButton"]').click();

    cy.get(circleComponentState.color).eq(0).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '2');
    cy.get(circleComponentState.color).eq(2).should('have.css', 'border-color', COLORS.default).should('have.text', '3');
    cy.get(circleComponentState.head).eq(0).should('have.text', 'head');
    cy.get(circleComponentState.tail).eq(2).should('have.text', 'tail');

    cy.get('[data-testid="resetButton"]').click();

    cy.get(circleComponentState.letter).should('have.text', '').should('have.length', MAX_QUEUE_LENGTH);
    cy.get(circleComponentState.head).should('have.text', '').should('have.length', MAX_QUEUE_LENGTH);
    cy.get(circleComponentState.tail).should('have.text', '').should('have.length', MAX_QUEUE_LENGTH);
  });
});
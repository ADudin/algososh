import { 
  listURL,
  COLORS,
  circleComponentState
} from "../utils/constants";

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('list page should work correctly', () => {
  beforeEach(() => {
    cy.visit(listURL);
  });

  it('should render buttons with empty input fields correctly', () => {
    cy.get('input').clear();
    cy.get('button').contains('Добавить в head').parent().should('be.disabled');
    cy.get('button').contains('Добавить в tail').parent().should('be.disabled');
    cy.get('button').contains('Добавить по индексу').parent().should('be.disabled');
    cy.get('button').contains('Удалить по индексу').parent().should('be.disabled');
  });

  it('should render initial list correctly', () => {
    cy.get(circleComponentState.color).should('not.be.empty');
    cy.get(circleComponentState.head).first().should('have.text', 'head');
    cy.get(circleComponentState.tail).last().should('have.text', 'tail');
    cy.get('button').contains('Удалить из head').parent().not('be.disabled');
    cy.get('button').contains('Удалить из tail').parent().not('be.disabled');
  });

  it('should add items in haed correctly', () => {
    cy.get('input[name="inputValue"]').type('1').should('have.value', '1');
    cy.get('button').contains('Добавить в head').parent().click();
    cy.get(circleComponentState.head).first().should('have.text', '1');

    cy.clock();

    cy.get(circleComponentState.color).first().should('have.css', 'border-color', COLORS.modified).should('have.text', '1');
    cy.get(circleComponentState.head).first().should('have.text', 'head');
    cy.get(circleComponentState.head).eq(1).should('have.text', '');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).first().should('have.css', 'border-color', COLORS.default).should('have.text', '1');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('input[name="inputValue"]').type('2').should('have.value', '2');
    cy.get('button').contains('Добавить в head').parent().click();
    cy.get(circleComponentState.head).first().should('have.text', '2');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).first().should('have.css', 'border-color', COLORS.modified).should('have.text', '2');
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
    cy.get(circleComponentState.head).first().should('have.text', 'head');
    cy.get(circleComponentState.head).eq(1).should('have.text', '');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).first().should('have.css', 'border-color', COLORS.default).should('have.text', '2');
  });

  it('should add items in tail correctly', () => {
    cy.get('input[name="inputValue"]').type('1').should('have.value', '1');
    cy.get('button').contains('Добавить в tail').parent().click();

    cy.clock();

    cy.get(circleComponentState.color).last().should('have.css', 'border-color', COLORS.modified).should('have.text', '1');
    cy.get(circleComponentState.tail).last().should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).last().should('have.css', 'border-color', COLORS.default).should('have.text', '1');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('input[name="inputValue"]').type('2').should('have.value', '2');
    cy.get('button').contains('Добавить в tail').parent().click();

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).last().should('have.css', 'border-color', COLORS.modified).should('have.text', '2');
    cy.get(circleComponentState.tail).last().should('have.text', 'tail');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).last().should('have.css', 'border-color', COLORS.default).should('have.text', '2');
  });

  it('should add items by index correctly', () => {
    cy.get('input[name="inputValue"]').type('1').should('have.value', '1');
    cy.get('input[name="indexValue"]').type('1').should('have.value', '1');
    cy.get('button').contains('Добавить по индексу').parent().click();

    cy.clock();

    cy.get(circleComponentState.color).first().should('have.css', 'border-color', COLORS.changing);
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default);
    cy.get(circleComponentState.head).eq(1).should('have.text', '1');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).first().should('have.css', 'border-color', COLORS.default);
    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.modified).should('have.text', '1');
    cy.get(circleComponentState.head).eq(1).should('have.text', '');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '1');
  });

  it('should remove items from head correctly', () => {
    cy. clock();

    cy.get('button').contains('Удалить из head').parent().click();
    cy.get(circleComponentState.letter).first().should('have.text', '');

    cy.tick(SHORT_DELAY_IN_MS);
    
    cy.get(circleComponentState.letter).first().not('have.text', '');
    cy.get(circleComponentState.head).first().should('have.text', 'head');
  });

  it('should remove items from tail correctly', () => {
    cy.clock();

    cy.get('button').contains('Удалить из tail').parent().click();
    cy.get(circleComponentState.color).last().should('have.css', 'border-color', COLORS.changing).not('have.text', '');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).last().should('have.css', 'border-color', COLORS.default).not('have.text', '');
    cy.get(circleComponentState.tail).last().should('have.text', 'tail');
  });

  it('should remove items by index correctly', () => {
    cy.clock();

    cy.get('input[name="indexValue"]').type('1').should('have.value', '1');
    cy.get('button').contains('Удалить по индексу').parent().click();
    cy.get(circleComponentState.color).first().should('have.css', 'border-color', COLORS.changing);
    
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.changing);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.color).eq(1).should('have.css', 'border-color', COLORS.default).should('have.text', '');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(circleComponentState.letter).should('not.have.text', '');
  });
});
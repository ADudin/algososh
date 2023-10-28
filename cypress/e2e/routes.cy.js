import { 
  baseURL,
  recursionURL,
  fibonacciURL,
  sortingURL,
  stackURL,
  queueURL,
  listURL
} from "../utils/constants";

describe('app should work correctly with routes', () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it('should open main page by default', () => {
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('should open string component correctly', () => {
    cy.get('[data-cy="recursionLink"]').click();
    cy.contains('Строка');
    cy.url().should('include', recursionURL);
  });

  it('should open fibonacci page correctly', () => {
    cy.get('[data-cy="fibonacciLink"]').click();
    cy.contains('Последовательность Фибоначчи');
    cy.url().should('include', fibonacciURL);
  });

  it('should open sorting page correctly', () => {
    cy.get('[data-cy="sortingLink"]').click();
    cy.contains('Сортировка массива');
    cy.url().should('include', sortingURL);
  });

  it('should open stack page correctly', () => {
    cy.get('[data-cy="stackLink"]').click();
    cy.contains('Стек');
    cy.url().should('include', stackURL);
  });

  it('should open queue page correctly', () => {
    cy.get('[data-cy="queueLink"]').click();
    cy.contains('Очередь');
    cy.url().should('include', queueURL);
  });

  it('should open list page correctly', () => {
    cy.get('[data-cy="listLink"]').click();
    cy.contains('Связный список');
    cy.url().should('include', listURL);
  });
});
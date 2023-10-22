import { baseURL } from "../utils/constants";

describe('app work correctly with routes', () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it('should open main page by default', () => {
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('should open string component correctly', () => {
    cy.get('[data-cy="recursionLink"]').click();
    cy.contains('Строка');
    cy.url().should('include', '/recursion');
  });

  it('should open fibonacci page correctly', () => {
    cy.get('[data-cy="fibonacciLink"]').click();
    cy.contains('Последовательность Фибоначчи');
    cy.url().should('include', '/fibonacci');
  });

  it('should open sorting page correctly', () => {
    cy.get('[data-cy="sortingLink"]').click();
    cy.contains('Сортировка массива');
    cy.url().should('include', '/sorting');
  });

  it('should open stack page correctly', () => {
    cy.get('[data-cy="stackLink"]').click();
    cy.contains('Стек');
    cy.url().should('include', '/stack');
  });

  it('should open queue page correctly', () => {
    cy.get('[data-cy="queueLink"]').click();
    cy.contains('Очередь');
    cy.url().should('include', '/queue');
  });

  it('should open list page correctly', () => {
    cy.get('[data-cy="listLink"]').click();
    cy.contains('Связный список');
    cy.url().should('include', '/list');
  });
});
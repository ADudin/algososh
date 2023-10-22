import { baseURL } from "../utils/constants";

describe('app is available', () => {
  it('should be available on localhost: 3000', () => {
    cy.visit(baseURL);
  });
});
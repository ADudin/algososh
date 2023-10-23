export const baseURL = 'http://localhost:3000';
export const recursionURL = `${baseURL}/recursion`;

export const COLORS = {
  default: 'rgb(0, 50, 255)',
  changing: 'rgb(210, 82, 225)',
  modified: 'rgb(127, 224, 81)'
};

export const circleComponentState = {
  head: '[data-cy="circleHead"]',
  tail: '[data-cy="circleTail"]',
  letter: '[data-cy="circleLetter"]',
  color: '[data-cy="circleState"]',
};
import { render } from "@testing-library/react";

import { Circle } from "./circle";

import { ElementStates } from "../../../types/element-states";

describe('UI component: Circle', () => {
  
  it('without letter should render correctly', () => {
    const circle = render(<Circle />);
    expect(circle).toMatchSnapshot();
  });

  it('with letters should render correctly', () => {
    const circle = render(<Circle letter='test' />);
    expect(circle).toMatchSnapshot();
  });

  it('with head should render correctly', () => {
    const circle = render(<Circle head={'test'} />);
    expect(circle).toMatchSnapshot();
  });

  it('with React-component in head should render correctly', () => {
    const circle = render(<Circle head={<Circle letter='test' />} />);
    expect(circle).toMatchSnapshot();
  });

  it('with tail should render correctly', () => {
    const circle = render(<Circle tail={'test'} />);
    expect(circle).toMatchSnapshot();
  });

  it('with React-element in tail should render correctly', () => {
    const circle = render(<Circle tail={<Circle letter='test' />} />);
    expect(circle).toMatchSnapshot();
  });

  it('with index should render correctly', () => {
    const circle = render(<Circle index={0} />);
    expect(circle).toMatchSnapshot();
  });

  it('in small state should render correctly', () => {
    const circle = render(<Circle isSmall={true} />);
    expect(circle).toMatchSnapshot();
  });

  it('in default state should render correctly', () => {
    const circle = render(<Circle state={ElementStates.Default} />);
    expect(circle).toMatchSnapshot();
  });

  it('in changing state should render correctly', () => {
    const circle = render(<Circle state={ElementStates.Changing} />);
    expect(circle).toMatchSnapshot();
  });

  it('in modified state should render correctly', () => {
    const circle = render(<Circle state={ElementStates.Modified} />);
    expect(circle).toMatchSnapshot();
  });

});
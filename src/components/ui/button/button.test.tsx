import { render } from "@testing-library/react";

import { Button } from "./button";

describe('UI component: Button', () => {

  it('with text should render correctly', () => {
    const button = render(<Button text='test' />);
    expect(button).toMatchSnapshot();
  });

  it('without text should render correctly', () => {
    const button = render(<Button />);
    expect(button).toMatchSnapshot();
  });

  it('disabled should render correctly', () => {
    const button = render(<Button disabled={true} />);
    expect(button).toMatchSnapshot();
  });

  it('with loader should render correctly', () => {
    const button = render(<Button isLoader={true}/>);
    expect(button).toMatchSnapshot();
  });

});
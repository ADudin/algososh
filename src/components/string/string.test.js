import { 
  render, 
  screen, 
  fireEvent
} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { StringComponent } from "./string";

describe('component: StringComponent', () => {
  
  it('should render default StringComponent correctly', () => {
    render(
    <BrowserRouter>
      <StringComponent />
    </BrowserRouter>);

    const input = screen.getByTestId('input');
    const submitButton = screen.getByTestId('submitButton');
    
    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(screen.queryByTestId('circle')).toBeNull();
  });

  it('should render correctly even quantity of symbols', () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    
    const input = screen.getByTestId('input');
    const submitButton = screen.getByTestId('submitButton');
    const EVEN_TEST_DATA = 'eventest';
    
    fireEvent.change(input, {
      target: {value: EVEN_TEST_DATA}
    });
    fireEvent.click(submitButton);

    for (let i = 0; i < EVEN_TEST_DATA.length; i++) {
      expect((screen.getAllByTestId('circle')[i]).textContent === EVEN_TEST_DATA[i]);
    }
  });

  it('should render correctly odd quantity of symbols', () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    
    const input = screen.getByTestId('input');
    const submitButton = screen.getByTestId('submitButton');
    const ODD_TEST_DATA = 'oddtest';
    
    fireEvent.change(input, {
      target: {value: ODD_TEST_DATA}
    });
    fireEvent.click(submitButton);

    for (let i = 0; i < ODD_TEST_DATA.length; i++) {
      expect((screen.getAllByTestId('circle')[i]).textContent === ODD_TEST_DATA[i]);
    }
  });

  it('should render correctly with one symbol', () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    
    const input = screen.getByTestId('input');
    const submitButton = screen.getByTestId('submitButton');
    const ONE_SYMBOL_TEST_DATA = '1';
    
    fireEvent.change(input, {
      target: {value: ONE_SYMBOL_TEST_DATA}
    });
    fireEvent.click(submitButton);

    expect(screen.getByTestId('circle').textContent === ONE_SYMBOL_TEST_DATA);
  });

  it('should render correctly empty string', () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    
    const input = screen.getByTestId('input');
    const submitButton = screen.getByTestId('submitButton');
    const EMPTY_STRING_TEST_DATA = '';
    
    fireEvent.change(input, {
      target: {value: EMPTY_STRING_TEST_DATA}
    });
    fireEvent.click(submitButton);

    expect(screen.queryByTestId('circle')).toBeNull();
  });

});
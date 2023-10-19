import { 
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { SortingPage } from "./sorting-page";

describe('component: SortingPage', () => {

  it('should render default SortingPage with empty array correctly', () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    );
  
    const selectionRadioInput = screen.getByTestId('selectionRadio');
    const bubbleRadioInput = screen.getByTestId('bubbleRadio');
    const ascendingButton = screen.getByTestId('ascendingButton');
    const descendingButton = screen.getByTestId('descendingButton');
    const newArrayButton = screen.getByTestId('newArrayButton');
    const container = screen.getByTestId('container');

    expect(selectionRadioInput).toBeInTheDocument();
    expect(bubbleRadioInput).toBeInTheDocument();
    expect(ascendingButton).toBeInTheDocument();
    expect(descendingButton).toBeInTheDocument();
    expect(newArrayButton).toBeInTheDocument();
    expect(container).not.toBeEmptyDOMElement();
  });

  it('should render SortingPage with array from one element correctly', () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    );

    const newArrayButton = screen.getByTestId('newArrayButton');
    
    fireEvent.click(newArrayButton);

    const arrayElement = screen.getAllByTestId('arrayElement')[0];
  
    expect(arrayElement).toBeInTheDocument();
  });

  it('should render SortingPage with array from elements correctly', () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    );

    const MIN_ARRAY_LENGTH = 3;
    const MAX_ARRAY_LENGTH = 17;

    const newArrayButton = screen.getByTestId('newArrayButton');
    
    fireEvent.click(newArrayButton);

    const arrayElements = screen.getAllByTestId('arrayElement');
  
    expect(MIN_ARRAY_LENGTH <= arrayElements.length && arrayElements.length <= MAX_ARRAY_LENGTH);
  });

  it('should render ascending sorted array correctly', async () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    );

    screen.getByTestId('newArrayButton').click();
    screen.getByTestId('ascendingButton').click();

    const arrayElements = screen.getAllByTestId('arrayElement');
    const values = arrayElements.map(element => parseInt(element.textContent));
    const sortedValues = [...values].sort((a, b) => a - b);

    expect(sortedValues).toEqual(sortedValues);
  });

  it('should render descending sorted array correctly', async () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    );

    screen.getByTestId('newArrayButton').click();
    screen.getByTestId('descendingButton').click();

    const arrayElements = screen.getAllByTestId('arrayElement');
    const values = arrayElements.map(element => parseInt(element.textContent));
    const sortedValues = [...values].sort((a, b) => b - a);
    
    expect(sortedValues).toEqual(sortedValues);
  });
});
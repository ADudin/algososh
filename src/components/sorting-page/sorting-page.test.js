import { 
  render,
  screen,
  fireEvent
} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { SortingPage } from "./sorting-page";
import { renderBubbleSort, renderSelectionSort } from "../../utils";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

describe('component: SortingPage', () => {

  const mockSetState = (state) => {
    let result = [];

    result = state;
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('should render ascending sorted array using bubble sort correctly', async () => {
    expect(await renderBubbleSort([
      {index: 1, state: ElementStates.Default},
      {index: 3, state: ElementStates.Default},
      {index: 2, state: ElementStates.Default}
    ], Direction.Ascending, mockSetState))
    .toEqual([
      {index: 1, state: ElementStates.Modified},
      {index: 2, state: ElementStates.Modified},
      {index: 3, state: ElementStates.Modified}
    ]);
  });

  it('should render desscending sorted array using bubble sort correctly', async () => {
    expect(await renderBubbleSort([
      {index: 1, state: ElementStates.Default},
      {index: 3, state: ElementStates.Default},
      {index: 2, state: ElementStates.Default}
    ], Direction.Descending, mockSetState))
    .toEqual([
      {index: 3, state: ElementStates.Modified},
      {index: 2, state: ElementStates.Modified},
      {index: 1, state: ElementStates.Modified}
    ]);
  });

  it('should render ascending sorted array using selection sort correctly', async () => {
    expect(await renderSelectionSort([
      {index: 1, state: ElementStates.Default},
      {index: 3, state: ElementStates.Default},
      {index: 2, state: ElementStates.Default}
    ], Direction.Ascending, mockSetState))
    .toEqual([
      {index: 1, state: ElementStates.Modified},
      {index: 2, state: ElementStates.Modified},
      {index: 3, state: ElementStates.Modified}
    ]);
  });

  it('should render descending sorted array using selection sort correctly', async () => {
    expect(await renderSelectionSort([
      {index: 1, state: ElementStates.Default},
      {index: 3, state: ElementStates.Default},
      {index: 2, state: ElementStates.Default}
    ], Direction.Descending, mockSetState))
    .toEqual([
      {index: 3, state: ElementStates.Modified},
      {index: 2, state: ElementStates.Modified},
      {index: 1, state: ElementStates.Modified}
    ]);
  });
});
import styles from "./sorting-page.module.css";
import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

import { 
  getRandomArr,
  renderBubbleSort,
  renderSelectionSort
 } from "../../utils";

import { Direction } from "../../types/direction";
import { SortingMethods } from "../../types/sorting-method";
import { ElementStates } from "../../types/element-states";
import { TSortingArrayElement, TSortingPageState } from "../../types/sortig-page-state";

const MIN_LEN = 3;
const MAX_LEN = 17;
const MIN_EL_VALUE = 1;
const MAX_EL_VALUE = 100;

export const SortingPage: React.FC = () => {

  const getSortingArray = (): TSortingArrayElement[] => {
    const sortingArray = [];
    const array = getRandomArr(MIN_LEN, MAX_LEN, MIN_EL_VALUE, MAX_EL_VALUE);

    for (let i = 0; i < array.length; i ++) {
      const sortingArrayElement = {index: array[i], state: ElementStates.Default};
      sortingArray.push(sortingArrayElement);
    }

    return sortingArray;
  };

  const [sortingPageState, setSortingPageState] = useState<TSortingPageState>({
    array: getSortingArray(),
    sortingMethod: SortingMethods.Selection
  });

  const [isLoading, setIsLoading] = useState('');

  const setNewArray = (): void => {
    setSortingPageState({
      ...sortingPageState,
      array: getSortingArray()
    });
  };

  const setSortingMethod = (evt: ChangeEvent<HTMLInputElement>): void => {
    setSortingPageState({
      ...sortingPageState,
      sortingMethod: evt.target.value
    });
  };

  const renderSort = async (sortingDirection: Direction) => {
    setIsLoading(sortingDirection);
    if (sortingPageState.sortingMethod === SortingMethods.Bubble) {
      await renderBubbleSort(sortingPageState.array, sortingDirection, setSortingPageState);
    };
    if (sortingPageState.sortingMethod === SortingMethods.Selection) {
      await renderSelectionSort(sortingPageState.array, sortingDirection, setSortingPageState);
    }
    
    setIsLoading('');
  };

  return (
    <SolutionLayout title="Сортировка массива">

      <form className={styles.controls__container}>

        <fieldset className={`${styles.controls__fieldset} ${styles.controls__radio}`}>
          <RadioInput 
            label='Выбор'
            name='sorting method'
            value={SortingMethods.Selection}
            onChange={setSortingMethod}
            defaultChecked
            data-testid='selectionRadio'
          />
          <RadioInput 
            label='Пузырёк'
            name='sorting method'
            value={SortingMethods.Bubble}
            onChange={setSortingMethod}
            data-testid='bubbleRadio'
          />
        </fieldset>

        <fieldset className={`${styles.controls__fieldset} ${styles.controls__launch}`}>
          <Button 
            text='По возрастанию' 
            sorting={Direction.Ascending}
            extraClass={styles.controls__button}
            onClick={() => renderSort(Direction.Ascending)}
            isLoader={isLoading === Direction.Ascending}
            disabled={isLoading === Direction.Descending}
            data-testid='ascendingButton'
          />
          <Button 
            text='По убыванию' 
            sorting={Direction.Descending}
            extraClass={styles.controls__button}
            onClick={() => renderSort(Direction.Descending)}
            isLoader={isLoading === Direction.Descending}
            disabled={isLoading === Direction.Ascending}
            data-testid='descendingButton'
          />
        </fieldset>

        <Button 
          text="Новый массив"
          extraClass={styles.controls__button}
          onClick={setNewArray}
          disabled={isLoading === Direction.Descending || isLoading === Direction.Ascending}
          data-testid='newArrayButton'
        />

      </form>

      <div className={styles.display} data-testid='container'>
        {
          sortingPageState.array.map((item, i) => 
          <div key={i} data-testid='arrayElement'>
            <Column  
              index={item.index}
              state={item.state}
            />
          </div>)
        }
      </div>

    </SolutionLayout>
  );
};

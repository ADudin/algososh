import styles from "./sorting-page.module.css";
import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { getRandomArr, setStepTimeout } from "../../utils";

import { Direction } from "../../types/direction";
import { SortingMethods } from "../../types/sorting-method";
import { ElementStates } from "../../types/element-states";

import { DELAY_IN_MS } from "../../constants/delays";

interface ISortingArrayElement {
  index: number,
  state?: ElementStates
};

interface ISortingPageState {
  array: ISortingArrayElement[];
  sortingMethod: string;
};

const MIN_LEN = 3;
const MAX_LEN = 17;
const MIN_EL_VALUE = 1;
const MAX_EL_VALUE = 100;

export const SortingPage: React.FC = () => {

  const getSortingArray = (): ISortingArrayElement[] => {
    const sortingArray = [];
    const array = getRandomArr(MIN_LEN, MAX_LEN, MIN_EL_VALUE, MAX_EL_VALUE);

    for (let i = 0; i < array.length; i ++) {
      const sortingArrayElement = {index: array[i], state: ElementStates.Default};
      sortingArray.push(sortingArrayElement);
    }

    return sortingArray;
  };

  const [sortingPageState, setSortingPageState] = useState<ISortingPageState>({
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

  const renderBubbleSort = async (arr: ISortingArrayElement[], sortingDirection: Direction): Promise<ISortingArrayElement[]> => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {

        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;

        setSortingPageState({
          ...sortingPageState,
          array: [...arr]
        });

        await setStepTimeout(DELAY_IN_MS);

        if (
          sortingDirection === Direction.Ascending ? 
          arr[j].index > arr[j + 1].index :
          arr[j].index < arr[j + 1].index
          ) {
          const temp = arr[j].index;
          arr[j].index = arr[j + 1].index;
          arr[j + 1].index = temp;
        };

        arr[j].state = ElementStates.Default;

        if (arr[j + 1]) {
          arr[j + 1].state = ElementStates.Default;
        };

        setSortingPageState({
          ...sortingPageState,
          array: [...arr]
        });
      };
      
      arr[arr.length - i - 1].state = ElementStates.Modified;

      setSortingPageState({
        ...sortingPageState,
        array: [...arr]
      });
    };

    setIsLoading('');
    return arr;
  };

  const renderSelectionSort = async (arr: ISortingArrayElement[], sortingDirection: Direction): Promise<ISortingArrayElement[]> => {
    const {length} = arr;

    for (let i = 0; i < length; i++) {
      let start = i;
      arr[start].state = ElementStates.Changing;

      for (let j = i + 1; j < length; j++) {
        arr[j].state = ElementStates.Changing;

        setSortingPageState({
          ...sortingPageState,
          array: [...arr]
        });

        await setStepTimeout(DELAY_IN_MS);

        if (
          sortingDirection === Direction.Ascending ? 
          arr[j].index < arr[start].index : 
          arr[j].index > arr[start].index
          ) {
          start = j;
          arr[j].state = ElementStates.Default;
          i === start ? arr[start].state = ElementStates.Changing : arr[start].state = ElementStates.Default;
        } 
        
        if (j !== start) {
          arr[j].state = ElementStates.Default;
        }

        setSortingPageState({
          ...sortingPageState,
          array: [...arr]
        });
      }
      
      const temp = arr[i];
      arr[i] = arr[start];
      arr[start] = temp;

      arr[start].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;

      setSortingPageState({
        ...sortingPageState,
        array: [...arr]
      });
    }

    setIsLoading('');
    return arr;
  };

  const renderSort = (sortingDirection: Direction): void => {
    setIsLoading(sortingDirection);
    if (sortingPageState.sortingMethod === SortingMethods.Bubble) {
      renderBubbleSort(sortingPageState.array, sortingDirection);
    };
    if (sortingPageState.sortingMethod === SortingMethods.Selection) {
      renderSelectionSort(sortingPageState.array, sortingDirection);
    }
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
          />
          <RadioInput 
            label='Пузырёк'
            name='sorting method'
            value={SortingMethods.Bubble}
            onChange={setSortingMethod}
          />
        </fieldset>

        <fieldset className={`${styles.controls__fieldset} ${styles.controls__launch}`}>
          <Button 
            text='По возрастанию' 
            sorting={Direction.Ascending}
            extraClass={styles.controls__button}
            onClick={() => renderSort(Direction.Ascending)}
            isLoader={isLoading === Direction.Ascending}
          />
          <Button 
            text='По убыванию' 
            sorting={Direction.Descending}
            extraClass={styles.controls__button}
            onClick={() => renderSort(Direction.Descending)}
            isLoader={isLoading === Direction.Descending}
          />
        </fieldset>

        <Button 
          text="Новый массив"
          extraClass={styles.controls__button}
          onClick={setNewArray}
        />

      </form>

      <div className={styles.display}>
        {
          sortingPageState.array.map((item, i) => 
          <Column 
            key={i} 
            index={item.index}
            state={item.state}
          />)
        }
      </div>

    </SolutionLayout>
  );
};

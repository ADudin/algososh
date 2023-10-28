import { ElementStates } from "./types/element-states";
import { Direction } from "./types/direction";
import { TSortingArrayElement, TSortingPageState } from "./types/sortig-page-state";
import { TString } from "./types/string";
import { DELAY_IN_MS } from "./constants/delays";

const getRandomInteger = (a: number, b: number):number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArr = (minLen: number, maxLen: number, minElValue: number, maxElValue: number): number[] => {
  const randomArr: number[] = [];

  for (let i = 0; i < getRandomInteger(minLen, maxLen); i++) {
    const arrElement: number = getRandomInteger(minElValue, maxElValue);
    randomArr.push(arrElement);
  };

  return randomArr;
};

export const setStepTimeout = (time: number) => new Promise((res) => setTimeout(res, time));

// export const delay = (ms: number, value: string | null, {signal}: any = {}) => {

//   return new Promise((resolve, reject) => {
//     const listener = () => {
//       clearTimeout(timer);
//       reject(new Error('Aborted'));
//     };

//     const timer = setTimeout(() => {
//       signal?.removeEventListener('abort', listener);
//       resolve(value);
//     }, ms);

//     if (signal?.aborted) {
//       listener();
//     }

//     signal?.addEventListener('abort', listener);
//   });
// };

// === For string component ===

export const reverse = async (array: TString[], setData: any) => {

  for (let i = 0; i < array.length / 2; i++) {
    let start = i;
    let end = array.length - 1 - i;
    array[start].state = ElementStates.Changing;
    array[end].state = ElementStates.Changing;

    setData([ ...array ]);

    await setStepTimeout(DELAY_IN_MS);

    let temp = array[start].letter;

    array[start] = {
      letter: array[end].letter, 
      state: ElementStates.Modified
    };

    array[end] = {
      letter: temp,
      state: ElementStates.Modified
    };

    setData([ ...array ]);
  }

  return array;
};

// === For sorting page ===

export const renderBubbleSort = async (
  arr: TSortingArrayElement[], 
  sortingDirection: Direction, 
  setData: any
  ): Promise<TSortingArrayElement[]> => {

  const state: TSortingPageState = {
    array: arr,
    sortingMethod: sortingDirection
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;

      if(setData) {
        setData({ ...state });
      }

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

      setData({ ...state });
    };
    
    arr[arr.length - i - 1].state = ElementStates.Modified;

    setData({ ...state });
  };

  return arr;
};

export const renderSelectionSort = async (
  arr: TSortingArrayElement[], 
  sortingDirection: Direction,
  setData: any
  ): Promise<TSortingArrayElement[]> => {
  
  const state: TSortingPageState = {
    array: arr,
    sortingMethod: sortingDirection
  }

  const {length} = arr;

  for (let i = 0; i < length; i++) {
    let start = i;
    arr[start].state = ElementStates.Changing;

    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing;

      setData({ ...state });

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

      setData({ ...state });
    }
    
    const temp = arr[i];
    arr[i] = arr[start];
    arr[start] = temp;

    arr[start].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;

    setData({ ...state });
  }

  return arr;
};
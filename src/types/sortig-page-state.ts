import { ElementStates } from "./element-states";

export type TSortingArrayElement = {
  index: number,
  state?: ElementStates
};

export type TSortingPageState = {
  array: TSortingArrayElement[];
  sortingMethod: string;
};
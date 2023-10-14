interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getElements: () => T[];
  getSize: () => number;
};

export class Stack<T> implements IStack<T> {
  array: T[];

  constructor() {
    this.array = [];
  };

  push = (item: T): void => {
    this.array.push(item);
  };

  pop = (): void => {
    this.array.pop();
  };

  clear = (): void => {
    this.array = [];
  };

  getElements = (): T[] => {
    return this.array;
  }

  getSize = (): number => {
    return this.array.length;
  };
};
interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  getHead: () => {value: T | string; index: number};
  getTail: () => {value: T | string; index: number};
  getLength: () => number;
  getElements: () => (string| T)[];
};

export class Queue<T> implements IQueue<T> {
  array: (T | string)[];
  head = 0;
  tail = 0;
  length = 0;
  size = 0;

  constructor(size: number) {
    this.size = size;
    this.array = Array(this.size);
  };

  enqueue = (item: T): void => {
    this.array[this.tail] = item;
    this.tail += 1;
    this.length += 1;
  };

  dequeue = (): void => {
    if (this.head === this.size) {
      this.head = 0;
    };

    this.array[this.head] = '';
    this.head += 1;
    this.length -=1;
  };

  clear = (): void => {
    this.array = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  getHead = () => {
    return {
      value: this.array[this.head],
      index: this.head
    };
  };

  getTail = () => {
    return {
      value: this.array[this.tail - 1],
      index: this.tail - 1
    };
  };

  getLength = () => {
    return this.length;
  };

  getElements = () => {
    return this.array;
  };
};
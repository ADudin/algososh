interface ILinkedList<T> {
  prepend: (item: T) => void;
  append: (item: T) => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => number;
  toArray: () => T[] | undefined;
}

class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  };
};

export class LinkedList<T> implements ILinkedList<T> {
  size: number;
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;

  constructor(array: T[]) {
    this.size = 1;
    this.head = new LinkedListNode<T>(array[0]);
    this.tail = this.head;
    
    for (let i = 1; i < array.length; i++) {
      this.append(array[i]);
    }
  };

  prepend = (value: T) => {
    const newNode = new LinkedListNode<T>(value);

    if (this.head) {
      this.head.prev = newNode;
    }

    if (!this.tail) {
      this.tail = newNode;
    }

    newNode.next = this.head;
    this.head = newNode;
    this.size = this.size + 1;
  };

  append = (value: T) => {
    const newNode = new LinkedListNode<T>(value);

    if (this.tail) {
      this.tail.next = newNode;
    }

    if (!this.head) {
      newNode.next = this.head;
      this.head = newNode;
    }

    newNode.prev = this.tail;
    this.tail = newNode;
    this.size = this.size + 1;
  };

  addByIndex = (value: T, index: number) => {
    if (index < 0 || index > this.getSize()) {
			return null;
		} else {
			const node = new LinkedListNode(value);

			if (index === 0) {
				node.next = this.head;
				this.head = node;
			} else {
				let current = this.head;
				let currIndex = 0;
				let prev = this.head;

				while (currIndex < index) {
					if (current) {
						currIndex++;
						prev = current;
						current = current.next;
					}
				}

				node.next = current;
				if (prev) {
					prev.next = node;
				}
			}

			this.size = this.size + 1;
		}
  };

  deleteByIndex = (index: number) => {
    if (index < 0 || index > this.size) {
			return null;
		}
		let current = this.head;

		if (index === 0 && current) {
			this.head = current.next;
		} else {
			let previous = null;
			let currentIndex = 0;

			while (currentIndex < index && current) {
				previous = current;
				current = current.next;
				currentIndex++;
			}

			if (previous && current) {
				previous.next = current.next;
			}
		}

		this.size = this.size - 1;
  };

  deleteHead = () => {
    if (!this.head) {
      return null;
    }

    const headToRemove = this.head;

    if (headToRemove.next) {
      this.head = headToRemove.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size = this.size - 1;
  };

  deleteTail = () => {
    if (!this.tail || !this.head) {
      return null;
    }

    const tailToRemove = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }

    if (tailToRemove.prev) {
      this.tail = tailToRemove.prev;
    }

    if (this.tail) {
      this.tail.next = null;
    }

    this.size = this.size - 1;
  };

  getSize = () => {
    return this.size;
  };

  toArray() {
    const result: T[] = [];

    if (this.head) {
      let currentNode = this.head;

      while(currentNode.next) {
        result.push(currentNode.value);
        currentNode = currentNode.next;
      }
      
      result.push(currentNode.value);
      return result;
    }

    return result;
  };
};
import {
  IEnumerator
} from '../../collections';

import {IStack, Stack} from '../../stack/Stack';

export interface IBinaryTree<T> {
  isEmpty: boolean;
  value: T;
  left: IBinaryTree<T>;
  right: IBinaryTree<T>;
}

export class BinaryTree<T> implements IBinaryTree<T> {
  constructor(
    private _value: T,
    private _left: IBinaryTree<T> = BinaryTree.Empty,
    private _right: IBinaryTree<T> = BinaryTree.Empty
  ) {}

  get isEmpty() { return false; }
  get value() { return this._value; }
  get left() { return this._left; }
  get right() { return this._right; }

  static Empty: IBinaryTree<any> = {
    get isEmpty() { return true; },
    get value(): any { throw new Error('Empty binary tree.'); },
    get left(): IBinaryTree<any> { throw new Error('Empty binary tree.'); },
    get right(): IBinaryTree<any> { throw new Error('Empty binary tree.'); }
  };

  static InOrder<T>(tree: IBinaryTree<T>): IEnumerator<T> {
    return new InOrderBinaryTreeEnumerator(tree);
  }
}

class InOrderBinaryTreeEnumerator<T> implements IEnumerator<T> {
  private _stack: IStack<IBinaryTree<T>> = Stack.Empty;
  private _state: number = 0;

  constructor(private _current: IBinaryTree<T>) { this._pump(); }

  get current() { return this._current.value; }
  get next() {
    this._pump();
    return this;
  }
  get hasNext() {
    return !(this._current.isEmpty && this._stack.isEmpty);
  }

  private _pump() {
    if (this._state === 1) {
      this._current = this._current.right;
      this._state = 0;
    }
    while (this.hasNext) {
      if (!this._current.isEmpty) {
        this._stack = this._stack.push(this._current);
        this._current = this._current.left;
      } else {
        this._current = this._stack.peek();
        this._stack = this._stack.pop();
        this._state = 1;
        return; // yield
      }
    }
  }
}

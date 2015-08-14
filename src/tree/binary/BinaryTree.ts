import {
  IEnumerator,
  IEnumerable
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
  ){}

  get isEmpty() { return false; }
  get value() { return this._value; }
  get left() { return this._left; }
  get right() { return this._right; }

  static Empty: IBinaryTree<any> = {
    get isEmpty() { return true; },
    get value():any { throw new Error("Empty binary tree."); },
    get left():IBinaryTree<any> { throw new Error("Empty binary tree."); },
    get right():IBinaryTree<any> { throw new Error("Empty binary tree."); }
  }

  static InOrder<T>(tree: IBinaryTree<T>): IEnumerator<T> {
    return new InOrderBinaryTreeEnumerator(tree);
  }
}

class InOrderBinaryTreeEnumerator<T> implements IEnumerator<T> {
  private _stack: IStack<IBinaryTree<T>> = Stack.Empty;
  private _value: T;
  constructor(private _current: IBinaryTree<T>){ this.next; }
  get current() { return this._value; }
  get next() {
    if (this.hasNext) {
      while (!this._current.isEmpty) {
        // Traverse left while there is a left
        this._stack = this._stack.push(this._current);
        this._current = this._current.left;
      }
      this._current = this._stack.peek();
      this._stack = this._stack.pop();
      this._value = this._current.value;
      this._current = this._current.right;
    }
    return this;
  }
  get hasNext() {
    return !(this._stack.isEmpty && this._current.isEmpty);
  }
}

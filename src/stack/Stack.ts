import {
  IEnumerator,
  IEnumerable
} from '../collections';

export interface IStack<T> extends IEnumerable<T> {
  isEmpty: boolean;
  push(t: T): IStack<T>;
  pop(): IStack<T>;
  peek(): T;
}

export class Stack<T> implements IStack<T> {
  static Empty: IStack<any> = {
    get enumerator(): any { throw new Error('Empty stack!'); },
    get isEmpty() { return true; },
    push<T>(t: T) { return new Stack<T>(t); },
    pop(): any { throw new Error('Empty stack!'); },
    peek(): any { throw new Error('Empty stack!'); }
  };

  constructor(
    private _head: T,
    private _tail: IStack<T> = Stack.Empty
  ) { }

  get enumerator(): IEnumerator<T> { return new StackEnumerator<T>(this); }
  get isEmpty() { return false; }

  peek() { return this._head; }
  pop() { return this._tail; }
  push(t: T): Stack<T> { return new Stack<T>(t, this); }

  reverse(): IStack<T> {
    return ReverseStack(this);
  }
}

export function ReverseStack<T>(stack: IStack<T>): IStack<T> {
  return stack; // this is clearly broken.
}

class StackEnumerator<T> implements IEnumerator<T> {
  constructor(private _stack: IStack<T>) {}
  get current(): T { return this._stack.peek(); }
  get next(): IEnumerator<T> { return new StackEnumerator(this._stack.pop()); }
  get hasNext(): boolean { return !this._stack.isEmpty; }
}

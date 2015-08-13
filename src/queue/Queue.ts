import {
	IEnumerator,
	IEnumerable,
	IStack,
	Stack
} from '../immutable';

export interface IQueue<T> extends IEnumerable<T> {
	isEmpty: boolean;
	peek(): T;
	enqueue(t: T): IQueue<T>;
	dequeue(): IQueue<T>;
}

export class Queue<T> implements IQueue<T> {
	constructor(
		private _forwards: IStack<T> = Stack.Empty,
		private _backwards: IStack<T> = Stack.Empty
	) { }
	get isEmpty():boolean { return false; }
	peek():T { return this._forwards.peek(); }
	enqueue(t: T): IQueue<T> {
		return new Queue<T>(this._forwards.push(t), this._backwards);
	}
	dequeue(): IQueue<T> {
		let f = this._forwards.pop();
		if (!f.isEmpty) {
			return new Queue(f, this._backwards);
		} else if (this._backwards.isEmpty) {
			return Queue.Empty;
		} else {
			return new Queue(Stack.reverse(this._backwards), Stack.Empty);
		}
	}

	static Empty:IQueue<any> = {
			get isEmpty() { return true; },
			peek(): any { throw new Error("Empty queue!"); },
			enqueue(t: any): IQueue<any> { return new Queue(new Stack(t), Stack.Empty); },
			dequeue(): any { throw new Error("Empty queue!"); },
			get enumerator(): any { throw new Error("Empty queue!"); }
	}

	get enumerator(): IEnumerator<T> { return new QueueEnumerator(this); }
}

class QueueEnumerator<T> implements IEnumerator<T> {
	constructor(private _queue: IQueue<T>) { }
	get current() { return this._queue.peek(); }
	get next():IEnumerator<T> { return new QueueEnumerator(this._queue.dequeue()); }
	get hasNext() { return !this._queue.isEmpty; }
}

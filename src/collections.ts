export interface IEnumerator<T> {
	current: T;
	next: IEnumerator<T>;
	hasNext: boolean;
}

export interface IEnumerable<T> {
	enumerator: IEnumerator<T>;
}

export interface IPrintable {
	toPrintString(): string;
}

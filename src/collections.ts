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

export interface IComparable<K> {
  compareTo(other: K): boolean;
}

export interface IKeyValuePair<K, V>{
  key: K;
  value: V;
}

export interface IMap<J, V> {
  keys: IEnumerable<J>;
  values: IEnumerable<V>;
  pairs: IEnumerable<IKeyValuePair<J, V>>;
  contains<K extends IComparable<J>>(key: K): boolean;
  lookup<K extends IComparable<J>>(key: K): V;
  add<K extends IComparable<J>>(key: K, value: V): IMap<K, V>;
  remove<K extends IComparable<J>>(key: K, value: V): IMap<K, V>;
}

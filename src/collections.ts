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

export interface KeyValuePair<K, V>{
  key: K;
  value: V;
}

export interface IMap<K extends IComparable<K>, V> {
  contains(key: K): boolean;
  lookup(key: K): V;
  add(key: K, value: V): IMap<K, V>;
  remove(key: K, value: V): IMap<K, V>;
  keys: IEnumerable<K>;
  values: IEnumerable<V>;
  pairs: IEnumerable<KeyValuePair<K, V>>;
}
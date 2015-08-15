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
  compareTo(other: IComparable<K>): number;
  value: K;
}

export interface IKeyValuePair<K, V>{
  key: K;
  value: V;
}

export class KeyValuePair<K, V> implements IKeyValuePair<K, V> {
  constructor(
    private _key: K,
    private _val: V
  ) {}
  get key() { return this._key; }
  get value() { return this._val; }
}

export interface IMap<K extends IComparable<any>, V> {
  keys: IEnumerator<K>;
  values: IEnumerator<V>;
  pairs: IEnumerator<IKeyValuePair<K, V>>;
  contains<K>(key: K): boolean;
  lookup<K>(key: K): V;
  add(key: K, value: V): IMap<K, V>;
  remove(key: K, value: V): IMap<K, V>;
}

export interface IDictionary<V> {
  keys: IEnumerator<string>;
  values: IEnumerator<V>;
  pairs: IEnumerator<IKeyValuePair<string, V>>;
  contains(key: string): boolean;
  lookup(key: string): V;
  add(key: string, value: V): IDictionary<V>;
  remove(key: string, value: V): IDictionary<V>;
}

class DictionaryKey implements IComparable<string> {
  constructor(private _string: string) { }
  get value() { return this._string; }
  compareTo(other: DictionaryKey): number {
    return other.value.localeCompare(this.value);
  }
}


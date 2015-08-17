import {
  IComparable,
  IEnumerator,
  IDictionary,
  IBinarySearchTree,
  IKeyValuePair,
  KeyValuePair,
  IMap
} from '../../immutable';

import {
  AVLTree
} from './BinarySearchTree';

class Dictionary<V> implements IDictionary<V> {
  constructor(private _tree: IBinarySearchTree<DictionaryKey, V>) {}
  get keys(): IEnumerator<string> {
    return new DictionaryKeyEnumerator(this._tree.keys);
  }
  get values(): IEnumerator<V> { return this._tree.values; }
  get pairs(): IEnumerator<IKeyValuePair<string, V>> {
    return new DictionaryEntryEnumerator(this._tree.pairs);
  }
  contains(key: string): boolean {
    return this._tree.contains(new DictionaryKey(key));
  }
  lookup(key: string): V {
    return this._tree.lookup(new DictionaryKey(key));
  }
  add(key: string, value: V): IDictionary<V> {
    return new Dictionary<V>(this._tree.add(new DictionaryKey(key), value));
  }
  remove(key: string, value: V): IDictionary<V> {
    return new Dictionary<V>(this._tree.remove(new DictionaryKey(key)));
  }

  static Empty: Dictionary<any> = new Dictionary(AVLTree.Empty);
}

class DictionaryKey implements IComparable<string> {
  constructor(private _string: string) { }
  get value() { return this._string; }
  compareTo(other: DictionaryKey): number {
    return other.value.localeCompare(this.value);
  }
}

class DictionaryKeyEnumerator implements IEnumerator<string> {
  constructor(private _inOrder: IEnumerator<DictionaryKey>) {}
  get current(): string {
    return this._inOrder.current.value;
  }
  get next() { return new DictionaryKeyEnumerator(this._inOrder.next); }
  get hasNext() { return this._inOrder.hasNext; }
}

class DictionaryEntryEnumerator<V>
  implements IEnumerator<IKeyValuePair<string, V>>
{
  constructor(private _inOrder: IEnumerator<IKeyValuePair<DictionaryKey, V>>) {}
  get current(): IKeyValuePair<string, V> {
    const current = this._inOrder.current;
    return new KeyValuePair(current.key.value, current.value);
  }
  get next() { return new DictionaryEntryEnumerator(this._inOrder.next); }
  get hasNext() { return this._inOrder.hasNext; }
}

class SymbolDictionary<V> implements IMap<SymbolKey, V> {
  constructor(private _tree: IBinarySearchTree<SymbolKey, V>) {}

  contains(key: symbol): boolean {
    return this._tree.contains(new SymbolKey(key));
  }
  lookup(key: symbol): V {
    return this._tree.lookup(new SymbolKey(key));
  }
  add(key: symbol, value: V): SymbolDictionary<V> {
    return new SymbolDictionary<V>(this._tree.add(new SymbolKey(key), value));
  }
  remove(key: symbol, value: V): SymbolDictionary<V> {
    return new SymbolDictionary<V>(this._tree.remove(new SymbolKey(key)));
  }

  static Empty: Dictionary<any> = new Dictionary(AVLTree.Empty);
}

class SymbolKey implements IComparable<symbol> {
  constructor(private _symbol: symbol) {}
  get value(): symbol { return this._symbol; }
  compareTo(o: SymbolKey): number {
    return o.value.toString().localeCompare(this.value.toString());
  }
}

class SymbolKeyEnumerator implements IEnumerator<symbol> {
  constructor(private _inOrder: IEnumerator<SymbolKey>) {}
  get current(): symbol {
    return this._inOrder.current.value;
  }
  get next() { return new SymbolKeyEnumerator(this._inOrder.next); }
  get hasNext() { return this._inOrder.hasNext; }
}

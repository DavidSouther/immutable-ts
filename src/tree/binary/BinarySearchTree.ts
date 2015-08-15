import {
  IBinaryTree
} from './BinaryTree';

import {
  IMap,
  IComparable,
  IEnumerator,
  IKeyValuePair,
  KeyValuePair
} from '../../collections';

import {
  IStack,
  Stack
} from '../../stack/Stack';

export interface IBinarySearchTree<K extends IComparable<any>, V>
  extends IMap<K, V>, IBinaryTree<V>
{
  key: K;
  left: IBinarySearchTree<K, V>;
  right: IBinarySearchTree<K, V>;
  height: number;
  add(key: K, value: V): IBinarySearchTree<K, V>;
  remove(key: K): IBinarySearchTree<K, V>;
  search(key: K): IBinarySearchTree<K, V>;
}

export class AVLTree<K extends IComparable<any>, V>
  implements IBinarySearchTree<K, V>
{

  static Empty: IBinarySearchTree<any, any> = {
    get isEmpty(): boolean { return true; },
    get height(): number { return 0; },
    get key(): any { throw new Error('Empty Binary Search Tree'); },
    get value(): any { throw new Error('Empty Binary Search Tree'); },
    get left(): any { throw new Error('Empty Binary Search Tree'); },
    get right(): any { throw new Error('Empty Binary Search Tree'); },
    get keys(): any { throw new Error('Empty Binary Search Tree'); },
    get values(): any { throw new Error('Empty Binary Search Tree'); },
    get pairs(): any { throw new Error('Empty Binary Search Tree'); },
    add<K extends IComparable<any>, V>(k: K, v: V): IBinarySearchTree<K, V> {
      return new AVLTree(k, v);
    },
    remove<K>(k: K): any { throw new Error('Empty Binary Search Tree'); },
    search<K>(k: K): any { return this; },
    contains<K>(k: K): any { return false; },
    lookup<K>(k: K): any { throw new Error('Empty Binary Search Tree'); },
  };

  private _height: number;

  constructor(
    private _key: K,
    private _value: V,
    private _left = AVLTree.Empty,
    private _right = AVLTree.Empty
  ) {
    this._height = 1 + Math.max(this.left.height, this.right.height);
  }

  get isEmpty() { return false; }
  get key() { return this._key; }
  get value() { return this._value; }
  get left() { return this._left; }
  get right() { return this._right; }
  get height() { return this._height; }

  get keys(): IEnumerator<K> {
    return new InOrderBSTEnumerator(this, (t: IBinarySearchTree<K, V>) => {
      return t.key;
    });
  }

  get values(): IEnumerator<V> {
    return new InOrderBSTEnumerator(this, (t: IBinarySearchTree<K, V>) => {
      return t.value;
    });
  }

  get pairs(): IEnumerator<IKeyValuePair<K, V>> {
    return new InOrderBSTEnumerator(this, (t: IBinarySearchTree<K, V>) => {
      return new KeyValuePair(t.key, t.value);
    });
  }

  add(key: K, value: V): IBinarySearchTree<K, V> {
    return AVLTree.MakeBalanced(key.compareTo(this._key) > 0 ?
      new AVLTree(this.key, this.value, this.left, this.right.add(key, value))
    :
      new AVLTree(this.key, this.value, this.left.add(key, value), this.right)
    );
  }

  remove(key: K): IBinarySearchTree<K, V> {
    const comparison = key.compareTo(this.key);
    let result: IBinarySearchTree<K, V> = this;
    if (comparison === 0) {

      // we have a match. If this is a leaf, just remove it
      // by returning Empty.  If we have only one child,
      // replace the node with the child.
      if (this.right.isEmpty && this.left.isEmpty) {
        result = AVLTree.Empty;
      } else if (this.right.isEmpty && !this.left.isEmpty) {
        result = this.left;
      } else if (!this.right.isEmpty && this.left.isEmpty) {
        result = this.right;
      } else {
        // we have two children. Remove the next-highest node and
        // replace this node with it.
        let successor = this.right;
        while (!successor.left.isEmpty) {
          successor = successor.left;
        }
        result = new AVLTree<K, V>(
          successor.key,
          successor.value,
          this.left,
          this.right.remove(successor.key)
        );
      }
    } else if (comparison > 0) {
      result = new AVLTree(
        this.key,
        this.value,
        this.left,
        this.right.remove(key)
      );
    } else {
      result = new AVLTree(
        this.key,
        this.value,
        this.left.remove(key),
        this.right
      );
    }
    return AVLTree.MakeBalanced(result);
  }

  contains(k: K): boolean {
    return this.search(k).isEmpty;
  }
  lookup(k: K): V {
    return this.search(k).value;
  }
  search(k: K): IBinarySearchTree<K, V> {
    const comparison = k.compareTo(this.key);
    return (comparison < 0) ? this.left.search(k) :
      (comparison > 0) ? this.right.search(k) :
      this;
  }

  private static RotateRight(
    tree: IBinarySearchTree<any, any>
  ): IBinarySearchTree<any, any> {
    return tree.isEmpty ? tree :
      new AVLTree(
        tree.left.key,
        tree.left.value,
        tree.left.left,
        new AVLTree( // this tree is moving right
          tree.key,
          tree.value,
          tree.right,
          tree.left.right
        )
      );
  }
  private static RotateLeft(
    tree: IBinarySearchTree<any, any>
  ): IBinarySearchTree<any, any> {
    return tree.isEmpty ? tree :
      new AVLTree(
        tree.right.key,
        tree.right.value,
        new AVLTree( // this tree is moving left
          tree.key,
          tree.value,
          tree.left,
          tree.right.left
        ),
        tree.right.right
      );
  }
  private static DoubleRight(
    tree: IBinarySearchTree<any, any>
  ): IBinarySearchTree<any, any> {
    return AVLTree.RotateRight(
      tree.left.isEmpty ? tree :
      new AVLTree(
        tree.key,
        tree.value,
        AVLTree.RotateLeft(tree.left),
        tree.right
      )
    );
  }
  private static DoubleLeft(
    tree: IBinarySearchTree<any, any>
  ): IBinarySearchTree<any, any> {
    return AVLTree.RotateLeft(
      tree.right.isEmpty ? tree :
      new AVLTree(
        tree.key,
        tree.value,
        tree.left,
        AVLTree.RotateRight(tree.right)
      )
    );
  }

  private static Balance(tree: IBinarySearchTree<any, any>): number {
    return tree.right.height - tree.left.height;
  }
  private static IsHeavyLeft(tree: IBinarySearchTree<any, any>): boolean {
    return AVLTree.Balance(tree) < -1;
  }
  private static IsHeavyRight(tree: IBinarySearchTree<any, any>): boolean {
    return AVLTree.Balance(tree) > 1;
  }

  private static MakeBalanced(
    tree: IBinarySearchTree<any, any>
  ): IBinarySearchTree<any, any> {
    return AVLTree.IsHeavyRight(tree) ?
        AVLTree.IsHeavyLeft(tree.right) ?
          AVLTree.DoubleLeft(tree) :
          AVLTree.RotateLeft(tree)
        : AVLTree.IsHeavyLeft(tree) ?
          AVLTree.IsHeavyRight(tree.left) ?
            AVLTree.DoubleRight(tree) :
            AVLTree.RotateRight(tree)
          : tree;
  }
}

class InOrderBSTEnumerator<K extends IComparable<any>, V>
  implements IEnumerator< K|V|IKeyValuePair<K, V> >
{
  private _stack: IStack<IBinarySearchTree<K, V>> = Stack.Empty;
  private _state: number = 0;

  constructor(
    private _current: IBinarySearchTree<K, V>,
    private _fn: (t: IBinarySearchTree<K, V>) => K|V|IKeyValuePair<K, V>
  ) {
    this._pump();
  }

  get current(): K|V|IKeyValuePair<K, V> { return this._fn(this._current); }
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

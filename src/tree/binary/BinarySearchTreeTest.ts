/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chai/chai.d.ts' />

import { expect } from 'chai';

import {
  IComparable,
  IBinarySearchTree,
  IEnumerator,
  AVLTree
} from '../../immutable';

describe('AVLTree', function() {

  it('creates an AVL', function() {
    let tree = new AVLTree(N(42), 'foo');
    expect(tree.height).to.eq(1);
    let tree2 = tree.add(N(12), 'bar');
    expect(tree2.height).to.eq(2);
    let tree3 = tree.add(N(47), 'baz');
    expect(tree3.height).to.eq(2);
  });

  it('balances an AVL', function() {
    let tree = <IBinarySearchTree<Number, number>> AVLTree.Empty;
    for (let i = 0; i < 16; i++) {
      tree = tree.add(N(i), i);
    }
    expect(tree.height).to.eq(
      5, 'Tree of size 15 should have balanced to 5 levels'
    );
  });

  it('enumerates the keys of an AVL', function(){
    let tree = <IBinarySearchTree<String, string>> AVLTree.Empty;
    for (let s of ['C', 'B', 'D', 'A', 'G']) {
      tree = tree.add(S(s), s);
    }
    enumerate<string>('ABCDG', tree.values);
  });
});

function S(s: string): String {
  return new String(s);
}

class String implements IComparable<string> {
  constructor(private _s: string) {}
  get value(): string { return this._s; }
  compareTo(o: String) {
    return o.value.localeCompare(this.value);
  }
}

function N(n: number): Number {
  return new Number(n);
}

class Number implements IComparable<number> {
  constructor(private _x: number) {}
  get value(): number { return this._x; }
  compareTo(o: Number) {
    return o.value - this.value;
  }
}

// function ien<T>(enumeration: string, enumerator: IEnumerator<T>): void {
//   it(enumeration, function(){
//     enumerate(enumeration, enumerator);
//   });
// }

function enumerate<T>(enumeration: string, enumerator: IEnumerator<T>): void {
  let s = '';
  while (enumerator.hasNext) {
    s += enumerator.current;
    enumerator = enumerator.next;
  }

  expect(s).to.equal(enumeration);
}

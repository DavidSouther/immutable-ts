/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />

import { expect } from 'chai';

import {IBinaryTree, BinaryTree} from './BinaryTree';

describe('Binary Tree', function(){
  let left = new BinaryTree<number>(2);
  let right = new BinaryTree<number>(3);
  let root = new BinaryTree<number>(1, left, right);

  const E = BinaryTree.Empty;
  function BT(_: string, l?:IBinaryTree<string>, r?:IBinaryTree<string>) {
    return new BinaryTree(_, l, r);
  }

  it('is a binary tree', function(){
    expect(root.value).to.eq(1, 'Value of root is 1.');
    expect(root.left).to.eq(left, 'Left of root is left.');
    expect(root.right).to.eq(right, 'Right of root is right.');
  });

  it('can enumerate a single node', function(){
    let enumerator = BinaryTree.InOrder(left);
    expect(enumerator.hasNext).to.be.false;
    expect(enumerator.current).to.eq(2);
  });

  describe('three-trees', function(){
    ien('CBA', BT('A', BT('B', BT('C'))));
    ien('BCA', BT('A', BT('B', E, BT('C'))));
    ien('BAC', BT('A', BT('B'), BT('C')));
    ien('ACB', BT('A', E, BT('B', BT('C'))));
    ien('ABC', BT('A', E, BT('B', E, BT('C'))));
  });

  it('can enumerate a four-tree', function(){
    ien('DCBA', BT('A', BT('B', BT('C', BT('D')))));
    ien('CDBA', BT('A', BT('B', BT('C', E, BT('D')))));
    ien('CBDA', BT('A', BT('B', BT('C'), BT('D'))));
    ien('CBAD', BT('A', BT('B', BT('C')), BT('D')));
    ien('BDCA', BT('A', BT('B', E, BT('C', BT('D')))));
    ien('BCDA', BT('A', BT('B', E, BT('C', E, BT('D')))));
    ien('BCAD', BT('A', BT('B', E, BT('C')), BT('D')));
    ien('BADC', BT('A', BT('B'), BT('C', BT('D'))));
    ien('BACD', BT('A', BT('B'), BT('C', E, BT('D'))));
    ien('ADCB', BT('A', E, BT('B', BT('C', BT('D')))));
    ien('ACDB', BT('A', E, BT('B', BT('C', E, BT('D')))));
    ien('ACBD', BT('A', E, BT('B', BT('C'), BT('D'))));
    ien('ABDC', BT('A', E, BT('B', E, BT('C', BT('D')))));
    ien('ABCD', BT('A', E, BT('B', E, BT('C', E, BT('D')))));
  });

  function ien<T>(enumeration: string, tree: IBinaryTree<T>): void {
    console.log(enumeration, tree);
    it(enumeration, function(){
      enumerate(enumeration, tree);
    });
  }

  function enumerate<T>(enumeration: string, tree: IBinaryTree<T>):void {
    let enumerator = BinaryTree.InOrder(tree);
    let s = "";
    while (enumerator.hasNext) {
      s += enumerator.current;
      enumerator.next;
    }

    expect(s).to.equal(enumeration);
  }
});
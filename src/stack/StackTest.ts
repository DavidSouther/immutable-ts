/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import { expect } from 'chai';

import {IStack, Stack} from './Stack';

class Mammal {
  legs = 4;
}

class Giraffe extends Mammal {
  longNeck = true;
}

class Tiger extends Mammal {
  stripes = 42;
}

describe('Stack', function(){
  it("has a basic stack", function(){
    let sg0:IStack<Giraffe> = Stack.Empty;
    let g1 = new Giraffe(), sg1 = sg0.push(g1);
    let g2 = new Giraffe(), sg2 = sg1.push(g2);
    expect(sg2.peek()).to.equal(g2);
    expect(sg2.pop()).to.equal(sg1);

    // let sg4 = sg2.push(new Tiger());
    let sm2:IStack<Mammal> = sg2; // Covariant!
    let t1 = new Tiger(), sm3 = sm2.push(t1);
    expect(sm3.peek()).to.equal(t1);
  });
});

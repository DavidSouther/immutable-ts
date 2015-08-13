/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import { expect } from 'chai';

import { IPrintable } from '../collections';

import { IQueue, Queue } from './Queue'

class PS implements IPrintable {
	constructor(private _s: string) { }
	toPrintString() { return this._s; }
}

describe('Queue', function(){
  it('implements a basic immutable queue', function(){
  	let q0: IQueue<PS> = Queue.Empty;
  	let ps1 = new PS('a'), q1 = q0.enqueue(ps1);
  	let ps2 = new PS('b'), q2 = q1.enqueue(ps2);
  	let ps3 = new PS('c'), q3 = q2.enqueue(ps3);
		expect(q3.peek()).to.equal(ps3);
		expect(q3.dequeue()).to.equal(q2);
  });
});

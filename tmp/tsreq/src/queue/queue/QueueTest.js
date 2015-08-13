/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
var chai_1 = require('chai');
var Queue_1 = require('./Queue');
var PS = (function () {
    function PS(_s) {
        this._s = _s;
    }
    PS.prototype.toPrintString = function () { return this._s; };
    return PS;
})();
describe('Queue', function () {
    it('implements a basic immutable queue', function () {
        var q0 = Queue_1.Queue.Empty;
        var ps1 = new PS('a'), q1 = q0.enqueue(ps1);
        var ps2 = new PS('b'), q2 = q1.enqueue(ps2);
        var ps3 = new PS('c'), q3 = q2.enqueue(ps3);
        console.log(q3.peek(), ps3);
        chai_1.expect(q3.peek()).to.equal(ps3);
        chai_1.expect(q3.dequeue()).to.equal(q2);
    });
});

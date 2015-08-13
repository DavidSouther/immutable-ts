var immutable_1 = require('../immutable');
var Queue = (function () {
    function Queue(_forwards, _backwards) {
        if (_forwards === void 0) { _forwards = immutable_1.Stack.Empty; }
        if (_backwards === void 0) { _backwards = immutable_1.Stack.Empty; }
        this._forwards = _forwards;
        this._backwards = _backwards;
    }
    Object.defineProperty(Queue.prototype, "isEmpty", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.peek = function () { return this._forwards.peek(); };
    Queue.prototype.enqueue = function (t) {
        return new Queue(this._forwards, this._backwards.push(t));
    };
    Queue.prototype.dequeue = function () {
        var f = this._forwards.pop();
        if (!f.isEmpty) {
            return new Queue(f, this._backwards);
        }
        else if (this._backwards.isEmpty) {
            return Queue.Empty;
        }
        else {
            return new Queue(immutable_1.Stack.reverse(this._backwards), immutable_1.Stack.Empty);
        }
    };
    Object.defineProperty(Queue.prototype, "enumerator", {
        get: function () { return new QueueEnumerator(this); },
        enumerable: true,
        configurable: true
    });
    Queue.Empty = {
        get isEmpty() { return true; },
        peek: function () { throw new Error("Empty queue!"); },
        enqueue: function (t) { return new Queue(new immutable_1.Stack(t), immutable_1.Stack.Empty); },
        dequeue: function () { throw new Error("Empty queue!"); },
        get enumerator() { throw new Error("Empty queue!"); }
    };
    return Queue;
})();
exports.Queue = Queue;
var QueueEnumerator = (function () {
    function QueueEnumerator(_queue) {
        this._queue = _queue;
    }
    Object.defineProperty(QueueEnumerator.prototype, "current", {
        get: function () { return this._queue.peek(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueueEnumerator.prototype, "next", {
        get: function () { return new QueueEnumerator(this._queue.dequeue()); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueueEnumerator.prototype, "hasNext", {
        get: function () { return !this._queue.isEmpty; },
        enumerable: true,
        configurable: true
    });
    return QueueEnumerator;
})();

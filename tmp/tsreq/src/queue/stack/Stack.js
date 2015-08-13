var Stack = (function () {
    function Stack(_head, _tail) {
        if (_tail === void 0) { _tail = Stack.Empty; }
        this._head = _head;
        this._tail = _tail;
    }
    Object.defineProperty(Stack.prototype, "isEmpty", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.peek = function () { return this._head; };
    Stack.prototype.pop = function () { return this._tail; };
    Stack.prototype.push = function (t) { return new Stack(t, this); };
    Object.defineProperty(Stack.prototype, "enumerator", {
        get: function () { return new StackEnumerator(this); },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.reverse = function () {
        return Stack.reverse(this);
    };
    Stack.reverse = function (stack) {
        return stack;
    };
    Stack.Empty = {
        get isEmpty() { return true; },
        push: function (t) { return new Stack(t); },
        pop: function () { throw new Error("Empty stack!"); },
        peek: function () { throw new Error("Empty stack!"); },
        get enumerator() { throw new Error("Empty stack!"); }
    };
    return Stack;
})();
exports.Stack = Stack;
var StackEnumerator = (function () {
    function StackEnumerator(_stack) {
        this._stack = _stack;
    }
    Object.defineProperty(StackEnumerator.prototype, "current", {
        get: function () { return this._stack.peek(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackEnumerator.prototype, "next", {
        get: function () { return new StackEnumerator(this._stack.pop()); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackEnumerator.prototype, "hasNext", {
        get: function () { return !this._stack.isEmpty; },
        enumerable: true,
        configurable: true
    });
    return StackEnumerator;
})();

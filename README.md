# memoize-weak-promise
[![npm version](https://img.shields.io/npm/v/memoize-weak-promise.svg)](https://www.npmjs.com/package/memoize-weak-promise)

> Garbage-collected memoizer for variadic async functions

## Installation

```bash
npm install memoize-weak-promise
```

## Example

```js
import memoize from 'memoize-weak-promise';

var wrap0 = {value: 0};
var wrap1 = {value: 1};

const fn = memoize(a => new Promise(function rejectIfOdd(res, rej) {
    if (a.value % 2 === 1) setTimeout(() => rej(a.value), 1000);
    else setTimeout(() => res(a.value), 1000);
})); // Create a memoized function

var promise0 = fn(wrap0); // Returns a promise that will resolve to 0
var promise1 = fn(wrap1); // Returns a promise that will reject to 1

/* Will return cached versions if promises are pending: */
promise0 === fn(wrap0) // true
promise1 === fn(wrap1) // true

/* Will not cache rejected promises */
setTimeout(() => {
  promise0 === fn(wrap0) // true
  promise1 === fn(wrap1) // false, because the promise rejected
}, 1001);

/* Original arguments are now eligible for garbage collection: */
setTimeout(() => {
  wrap0 = wrap1 = undefined;
}, 1002);
```

## Features

- Memoizes multiple arguments of any type
- Previous arguments are automatically garbage-collected when no longer referenced elsewhere
- No external dependencies
- Will not cache promises if they fail
- Compatible with ES5 and up

## How does `memoize-weak` differ from other memoize implementations?

Memoize functions cache the return value of a function, so that it can be used again without having to recalculate the value.

They do this by maintaining a cache of arguments that the function has previously been called with, in order to return results that correspond to an earlier set of arguments.

Usually this argument cache is retained indefinitely, or for a predefined duration after the original function call. This means that any objects passed as arguments are not eligible for garbage collection, even if all other references to these objects have been removed.

`memoize-weak` uses "weak references" to the argument values, so that once all the references to the arguments have been removed elsewehere in the application, the arguments will become eligible for cleanup (along with any cached return values that correspond to those arguments).

This allows you to use memoized functions with impunity, without having to worry about potential memory leaks.

## Using `memoize-weak` in ES5 applications

`memoize-weak` requires that `Map` and `WeakMap` are globally available. This means that these will have to be polyfilled for use in an ES5 environment.

Some examples of `Map` and `WeakMap` polyfills for ES5:

- [Babel Polyfill](https://babeljs.io/docs/usage/polyfill/)
- [CoreJS](https://github.com/zloirock/core-js)
- [`es6-map`](https://www.npmjs.com/package/es6-map) and [`es6-weak-map`](https://www.npmjs.com/package/es6-weak-map)

- 1:
    - **call stack**
    - **execution context**
    - **hoisting**
    - **scope and lexical environment**
    - **function scope and lexical object**
    - **block scope and shadowing**
    - **module scope and global object**
    - **closure**
- 2:
    - **object reference and shallow copy**
    - **deep copy and methods**
    - **private and public properties**
    - **getter and setter**
    - **constructor, prototype, and methods**
    - **native prototype and primitive as object**
- 3:
    - **prototypical inheritance**
    - **class syntax and static properties**
    - **inheritance and encapsulation**
    - **this and this binding issue**
    - **call, apply, and bind methods**
    - **NFE and IIFE**
- 4:
    - **higher order function and callback**
    - **map, filter, and reduce methods**
    - **array-like and iterable objects**
    - **iterator protocol and generator function**
    - **async generator and async iterator**
    - **promise and async/await**
- 5:
    - **try/catch and error handling**
    - **callback hell and promise chaining**
    - **event loop**
    - **event handling and bubbling**
    - **event delegation and target**
    - **js keyboard event and js submit event**
- 6:
    - **composition and currying**
    - **memorization and caching**
    - **debouncing and throttling**
    - **spread and rest operators**
    - **short circuiting and nullish coalescing operator**
    - **computed property names and destructuring**
- 7:
    - **map, set, and array methods**
    - **flat and flatMap methods**
    - **WeakMap and WeakSet**
    - **sorting array and compare function**
    - **query selector and DOM manipulation**
    - **regular expression and string methods**


----



###  Execution Context
`Everything in JavaScript happens inside an execution context.`

It has two components:
- Memory Component(variable environment)
- Code Component (thread of execution)

In the memory component, it stores all the variables and function declarations in key-value pairs. 

In the code component, it executes the code line by line.

So we can say javascript is `synchronous and single-threaded language`.
Means it can execute one command at a time and in a specific order.

-----









----

### Hoisting

`Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope.`

```js
console.log(a); // undefined
var a = 10;
```
- In the first line, you might expect a ReferenceError since myVar is not yet declared. But due to hoisting, JavaScript already knows about myVar declaration, but not its initialization. So, it gives undefined.


```js
sum(10, 10); // 20
function sum(a, b) {
  return a + b;
}
```
- In the first line, you might expect a ReferenceError since sum is not yet declared. But due to hoisting, JavaScript already knows about sum declaration, but not its initialization. So, it gives undefined.

```js
sum(10, 10); // TypeError: sum is not a function

var sum = (a, b) => {
  return a + b;
}
```

- It behave like another variable declaration. So, it gives undefined.











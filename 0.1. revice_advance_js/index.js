//Function Invocation and Execution Stack
var x = 1;

a()
b()

console.log(x)

function a() {
    var x = 10;
    console.log(x)
}

function b() {
    var x =  100;
    console.log(x)
}

var a = 10; // This is a global variable

function b() {
    var x = 10; // This is a local variable
}

console.log(window.a); // Outputs: 10
console.log(this.a); // Outputs: 10
console.log(window.x); // Outputs: undefined
console.log(this.x); // Outputs: undefined
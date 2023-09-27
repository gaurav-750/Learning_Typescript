"use strict";
// interface Person {
//   name: string;
//   age: number;
class Person {
    constructor(n) {
        this.age = 20;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + " " + this.name);
        }
        else {
            console.log("Hi");
        }
    }
}
const p1 = new Person();
p1.greet("Hello everyone, I'm");
console.log(typeof p1);
const add = (a, b) => {
    return a + b;
};

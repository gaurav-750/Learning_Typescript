// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// let user1: Person = {
//   name: "Gaurav",
//   age: 30,

//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };

// user1.greet("Hi there - I am");

interface Named {
  name?: string;

  //optional properties
  outputName?: string;
}

//this forms a new interface
interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 20;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string): void {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi");
    }
  }
}

const p1 = new Person();
p1.greet("Hello everyone, I'm");
console.log(typeof p1);

//interfaces as function types
interface AddFn {
  (a: number, b: number): number;
}

const add: AddFn = (a: number, b: number) => {
  return a + b;
};

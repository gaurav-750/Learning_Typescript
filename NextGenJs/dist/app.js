"use strict";
console.log("Next Gen JS is ES6!");
//* Arrow functions
//default argument
const add = (a, b = 1) => {
    return a + b;
};
console.log(add(2));
//Spread operator
const hobbies = ["Sports", "Cooking", "Cricket"];
// const activeHobbies = ["Anime", ...hobbies];
const activeHobbies = ["Anime"];
activeHobbies.push(...hobbies);
console.log(activeHobbies);
//spread operator with objects
const person = {
    firstName: "Gaurav",
    age: 20,
};
const copiedPerson = Object.assign(Object.assign({}, person), { isSingle: true });
console.log(copiedPerson);
//Rest parameters
const addNumbers = (...nums) => {
    let res = 0;
    for (const num of nums) {
        res += num;
    }
    return res;
};
console.log(addNumbers(2, 3, 4, 5.6, 11));
//Array and Object Destructuring
const [hobby1, hobby2, ...remainingHobbies] = activeHobbies;
console.log(hobby1, hobby2, remainingHobbies);
const { firstName, age: myAge } = person;
console.log(firstName, myAge);

"use strict";
// const names: string[] = [];
// const names: Array<string> = [];
// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }
//constraints
function merge(objA, objB) {
    //   return Object.assign(objA, objB);
    return Object.assign(Object.assign({}, objA), objB);
}
const mergedObject = merge({ name: "Gaurav", hobbies: ["Cricket", "Anime"] }, { age: 20 });
// const mergedObject = merge({ name: "Gaurav" });
console.log(mergedObject);
function countAndDescribe(element) {
    let description = "Got no value";
    if (element.length === 1) {
        description = "Got 1 element";
    }
    else if (element.length > 1) {
        description = "Got " + element.length + " elements";
    }
    return [element, description];
}
console.log(countAndDescribe(["Sports", "Cooking"]));
function extract(obj, key) {
    return obj[key];
}
console.log(extract({ age: 20, name: "Gaurav" }, "name"));
//* Generic Classes
//hence, this class will only work for primitive types
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(data) {
        this.data.push(data);
    }
    removeItem(data) {
        this.data.splice(this.data.indexOf(data), 1);
    }
    getItems() {
        return this.data;
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Gaurav");
textStorage.addItem("Kanak");
textStorage.addItem("Sar");
// textStorage.addItem(11);
textStorage.removeItem("Sar");
console.log(textStorage.getItems());
// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Gaurav" });
// objStorage.addItem({ name: "Kanak" });
// // objStorage.removeItem({ name: "Gaurav" }); //does not work for objects
// console.log(objStorage.getItems());

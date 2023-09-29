// const names: string[] = [];

// const names: Array<string> = [];

// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

//constraints
function merge<T extends object, U extends object>(objA: T, objB: U) {
  //   return Object.assign(objA, objB);
  return { ...objA, ...objB };
}

const mergedObject = merge(
  { name: "Gaurav", hobbies: ["Cricket", "Anime"] },
  { age: 20 }
);
// const mergedObject = merge({ name: "Gaurav" });
console.log(mergedObject);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T) {
  let description = "Got no value";
  if (element.length === 1) {
    description = "Got 1 element";
  } else if (element.length > 1) {
    description = "Got " + element.length + " elements";
  }

  return [element, description];
}

console.log(countAndDescribe(["Sports", "Cooking"]));

function extract<T, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

console.log(extract({ age: 20, name: "Gaurav" }, "name"));

//* Generic Classes

//hence, this class will only work for primitive types
class DataStorage<T extends number | string | boolean> {
  private data: T[] = [];

  addItem(data: T) {
    this.data.push(data);
  }

  removeItem(data: T) {
    this.data.splice(this.data.indexOf(data), 1);
  }

  getItems() {
    return this.data;
  }
}

const textStorage = new DataStorage<string>();
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

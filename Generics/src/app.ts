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

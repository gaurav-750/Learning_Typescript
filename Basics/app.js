// function add(n1: number, n2: number) {
//   return n1 + n2;
// }
//*Union Types
/*
function combine(
  n1: myAliasType,
  n2: myAliasType,
  resultType: "as-number" | "as-text" //literal type
) {
  let result: number | string;
  if (
    (typeof n1 === "number" && typeof n2 === "number") ||
    resultType === "as-number"
  ) {
    result = +n1 + +n2;
  } else {
    //if any one of them is not a number -> convert to string and then add
    result = n1.toString() + n2.toString();
  }
  return result;
}

const combinedAges = combine("30", "26", "as-number");
console.log(combinedAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
*/
//* Function return types and void
/*
function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  // this function does not return anything, hence void return type
  console.log("Result is: " + num);
}

printResult(add(5, 12));

let combinedValues: (a: number, b: number) => number;

combinedValues = add;
console.log(combinedValues(7, 8));

function sendRequest(data: string, cb: (response: any) => void) {
  //... sending a request with "data"
  return cb({ data: "Hi there!" });
}

let ans = sendRequest("My data!!", (response) => {
  console.log(response);
  return true;
});
console.log(ans);

*/
//* Unknown type
var userInput;
var userName = "";
// ..
// userName = userInput; // this will give error
// unknown is more restrictive than any
// unknown is better than any
userInput = 55;
userInput = "Gon";
if (typeof userInput === "string") {
    userName = userInput;
}
console.log(userName);
function generateError(message, errorCode) {
    throw { message: message, errorCode: errorCode };
}
var msg = generateError("An error occurred!", 500);
console.log(msg);

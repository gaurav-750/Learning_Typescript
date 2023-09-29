// console.log("Advanced Types!");

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

//we want another type which is the combination of the above two types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Gaurav",
  privileges: ["p1", "p2"],
  startDate: new Date(),
};

console.log(e1);

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
// const u1: Universal = 1;

function add(n1: Combinable, n2: Combinable) {
  //* 1st type guard
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }

  //means both are numbers
  return n1 + n2;
}

//* 2nd type guard
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("name:", emp.name);

  if ("privileges" in emp) {
    console.log("privileges:", emp.privileges);
  }

  if ("startDate" in emp) {
    console.log("startDate:", emp.startDate);
  }
}

const ue1: UnknownEmployee = {
  name: "Gaurav",
  privileges: ["p1", "p2"],
  startDate: new Date(),
};

printEmployeeInformation(e1);

//* 3rd type of type guard
class Car {
  drive() {
    console.log("driving a car...");
  }
}

class Truck {
  drive() {
    console.log("driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("loading cargo...", amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(100);
  }
}

useVehicle(v1);
useVehicle(v2);

//* Discriminated Unions
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function animalMovingSpeed(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
    default:
      break;
  }

  console.log("Moving Speed:", speed);
}

animalMovingSpeed({ type: "bird", flyingSpeed: 10 });

//* Type Casting
const inputElement = document.getElementById(
  "message-input"
) as HTMLInputElement;

inputElement.value = "Hi there!";

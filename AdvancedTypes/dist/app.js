"use strict";
// console.log("Advanced Types!");
const e1 = {
    name: "Gaurav",
    privileges: ["p1", "p2"],
    startDate: new Date(),
};
console.log(e1);
// const u1: Universal = 1;
function add(n1, n2) {
    //* 1st type guard
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + n2.toString();
    }
    //means both are numbers
    return n1 + n2;
}
function printEmployeeInformation(emp) {
    console.log("name:", emp.name);
    if ("privileges" in emp) {
        console.log("privileges:", emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("startDate:", emp.startDate);
    }
}
const ue1 = {
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
    loadCargo(amount) {
        console.log("loading cargo...", amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(100);
    }
}
useVehicle(v1);
useVehicle(v2);
function animalMovingSpeed(animal) {
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
const inputElement = document.getElementById("message-input");
inputElement.value = "Hi there!";

"use strict";
//Class
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        //   private id: string;
        //   public name: string;
        //private field
        this.employees = [];
        // this.id = id;
        // this.name = n;
    }
    //DUMMY PARAMETER
    describe() {
        console.log(`Department details: ${this.id} ${this.name}`);
    }
    addEmployee(employee) {
        //some validation etc
        this.employees.push(employee);
    }
    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const accountsDepartment = new Department("1A1", "Accounts");
console.log(accountsDepartment);
accountsDepartment.addEmployee("Max");
accountsDepartment.addEmployee("Maxi");
// accountsDepartment.employees.push("Anna");
accountsDepartment.describe();
// const acCopy = { name: "Dummy", describe: accountsDepartment.describe };
// acCopy.describe();
accountsDepartment.printEmployeeInfo();

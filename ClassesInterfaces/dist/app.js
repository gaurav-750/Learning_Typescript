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
//Inheritance
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT"); //super must be called first, it'll call the constructor of the base class
        this.admins = admins;
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
const ItDept1 = new ITDepartment("1A2", ["Admin_01"]);
ItDept1.describe();
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    //getter
    get getLastReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found!");
    }
    //setter
    set setLastReport(value) {
        if (value) {
            this.addReport(value);
            return;
        }
        throw new Error("Please pass in a valid value!");
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    getReports() {
        console.log(this.reports);
    }
    //we can also override the base class methods
    addEmployee(employeeName) {
        if (employeeName === "Maxi") {
            return;
        }
        this.employees.push(employeeName);
    }
}
const accountsDept = new AccountingDepartment("1A3", ["report1", "report2"]); //[] is the reports
accountsDept.addReport("report3");
accountsDept.getReports();
accountsDept.describe();
console.log(accountsDept);
accountsDept.addEmployee("Max");
accountsDept.printEmployeeInfo();
accountsDept.setLastReport = "report4 latest one";
console.log(accountsDept.getLastReport);

//Class
class Department {
  //   private id: string;
  //   public name: string;

  //private field
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  //DUMMY PARAMETER
  describe(this: Department) {
    console.log(`Department details: ${this.id} ${this.name}`);
  }

  addEmployee(employee: string) {
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
  admins: string[];

  constructor(id: string, admins: string[]) {
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
  private lastReport: string;

  //getter
  get getLastReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found!");
  }

  //setter
  set setLastReport(value: string) {
    if (value) {
      this.addReport(value);
      return;
    }
    throw new Error("Please pass in a valid value!");
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  getReports() {
    console.log(this.reports);
  }

  //we can also override the base class methods
  addEmployee(employeeName: string): void {
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

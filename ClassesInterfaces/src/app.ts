//Class
class Department {
  //   private id: string;
  //   public name: string;

  //private field
  private employees: string[] = [];

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

const accountsDepartment = new Department("1A1", "Accounts");
console.log(accountsDepartment);
accountsDepartment.addEmployee("Max");
accountsDepartment.addEmployee("Maxi");

// accountsDepartment.employees.push("Anna");

accountsDepartment.describe();

// const acCopy = { name: "Dummy", describe: accountsDepartment.describe };
// acCopy.describe();

accountsDepartment.printEmployeeInfo();

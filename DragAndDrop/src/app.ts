interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(input: Validatable) {
  let isValid = true;

  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  if (input.minLength !== undefined && typeof input.value === "string") {
    isValid = isValid && input.value.length > input.minLength;
  }
  if (input.maxLength !== undefined && typeof input.value === "string") {
    isValid = isValid && input.value.length < input.maxLength;
  }

  if (input.min !== undefined && typeof input.value === "number") {
    isValid = isValid && input.value > input.min;
  }
  if (input.max !== undefined && typeof input.value === "number") {
    isValid = isValid && input.value < input.max;
  }

  return isValid;
}

class ProjectInput {
  templateElement: HTMLTemplateElement; //template
  divElement: HTMLDivElement; //jaha par hume ye template dalna hai
  element: HTMLFormElement;

  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    console.log("constructor called");

    //reference to both the elements
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    this.divElement = document.getElementById("app")! as HTMLDivElement;

    //this is the copy of the template
    const importNode = document.importNode(this.templateElement.content, true);

    //* this is the 'form' element, which is the first child of the template
    this.element = importNode.firstElementChild as HTMLFormElement;

    this.element.id = "user-input"; //adding id to the form element
    console.log(this.element);

    //* referencing the input elements
    this.titleInput = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.addFormToDiv();
    this.configure();
  }

  //* Methods

  private addFormToDiv() {
    //attach the form element to the div element
    this.divElement.appendChild(this.element);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private gatherInput(): [string, string, number] | void {
    const enteredTitle = this.titleInput.value;
    const enteredDescription = this.descriptionInput.value;
    const enteredPeople = this.peopleInput.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, parseFloat(enteredPeople)];
    }
  }

  private clearInputs() {
    this.titleInput.value = "";
    this.descriptionInput.value = "";
    this.peopleInput.value = "";
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    console.log("this", this);

    const userInput = this.gatherInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people); //
      this.clearInputs();
    }
  }
}

const projectInput = new ProjectInput();

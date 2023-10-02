"use strict";
function validate(input) {
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
    constructor() {
        console.log("constructor called");
        //reference to both the elements
        this.templateElement = document.getElementById("project-input");
        this.divElement = document.getElementById("app");
        //this is the copy of the template
        const importNode = document.importNode(this.templateElement.content, true);
        //* this is the 'form' element, which is the first child of the template
        this.element = importNode.firstElementChild;
        this.element.id = "user-input"; //adding id to the form element
        console.log(this.element);
        //* referencing the input elements
        this.titleInput = this.element.querySelector("#title");
        this.descriptionInput = this.element.querySelector("#description");
        this.peopleInput = this.element.querySelector("#people");
        this.addFormToDiv();
        this.configure();
    }
    //* Methods
    addFormToDiv() {
        //attach the form element to the div element
        this.divElement.appendChild(this.element);
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }
    gatherInput() {
        const enteredTitle = this.titleInput.value;
        const enteredDescription = this.descriptionInput.value;
        const enteredPeople = this.peopleInput.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid input, please try again!");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, parseFloat(enteredPeople)];
        }
    }
    clearInputs() {
        this.titleInput.value = "";
        this.descriptionInput.value = "";
        this.peopleInput.value = "";
    }
    submitHandler(event) {
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

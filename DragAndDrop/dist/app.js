"use strict";
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
        //* accessing the input elements
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
        if (enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredPeople.trim().length === 0) {
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

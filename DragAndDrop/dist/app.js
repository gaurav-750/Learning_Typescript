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
        console.log(this.element);
        this.setDiv();
    }
    setDiv() {
        //attach the form element to the div element
        this.divElement.appendChild(this.element);
    }
}
const projectInput = new ProjectInput();

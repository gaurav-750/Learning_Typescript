"use strict";
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class ProjectState {
    constructor() {
        this.listeners = []; //array of functions, whenever something changes, we will call all these functions
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listenerfn) {
        this.listeners.push(listenerfn);
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random.toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(newProject);
        console.log("🙏🙏 added new project:", this.projects);
        //call all the listener functions
        for (const listenerfn of this.listeners) {
            console.log("listenerfn", listenerfn);
            listenerfn(this.projects.slice()); //slice() is used to create a copy of the array
        }
    }
}
//! This is a global instace of ProjectState class - can access it everywhere
const projectState = ProjectState.getInstance();
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
        isValid = isValid && input.value >= input.min;
    }
    if (input.max !== undefined && typeof input.value === "number") {
        isValid = isValid && input.value <= input.max;
    }
    return isValid;
}
//Generic class
class Component {
    constructor(templateId, hostId, newElementId) {
        //reference to both the elements
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        //this is the copy of the template
        const importNode = document.importNode(this.templateElement.content, true);
        //* this is the 'form' element, which is the first child of the template
        this.element = importNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId; //adding id to the form element
        }
        console.log(this.element);
        this.addToDiv();
    }
    addToDiv() {
        //attach the form element to the div element
        this.hostElement.appendChild(this.element);
    }
}
class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", "user-input");
        console.log("constructor called");
        //* referencing the input elements
        this.titleInput = this.element.querySelector("#title");
        this.descriptionInput = this.element.querySelector("#description");
        this.peopleInput = this.element.querySelector("#people");
        this.configure();
    }
    //* Methods
    configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }
    renderContent() { }
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
            projectState.addProject(title, desc, people); //add to projects array in the ProjectState class
            this.clearInputs();
        }
    }
}
class ProjectItem extends Component {
    constructor(hostId, project) {
        super("single-project", hostId, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get Persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    configure() { }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.Persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
//ProjectList Class
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", `${type}-projects`);
        this.type = type;
        console.log("😎😎😎 List constructor called");
        this.assignedProjects = [];
        projectState.addListener((projects) => {
            let relevantProjects = projects.filter((project) => {
                if (this.type === "active") {
                    return project.status === ProjectStatus.Active;
                }
                else {
                    return project.status === ProjectStatus.Finished;
                }
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.renderContent();
    }
    renderProjects() {
        const ul = document.getElementById(`${this.type}-projects-list`);
        ul.innerHTML = "";
        for (const project of this.assignedProjects) {
            new ProjectItem(ul.id, project);
        }
    }
    renderContent() {
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
        this.element.querySelector("ul").id = `${this.type}-projects-list`;
    }
    configure() { }
}
const projectInput = new ProjectInput();
const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");

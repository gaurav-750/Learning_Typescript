import { Component } from "./base-component.js";
export class ProjectItem extends Component {
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
    dragStartHandler(event) {
        console.log("👍dragStartHandler", event, this.project);
        event.dataTransfer.setData("text/plain", this.project.id); //setting the data to be transferred
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(event) {
        console.log("DragEnd");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler.bind(this));
        this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.Persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
}

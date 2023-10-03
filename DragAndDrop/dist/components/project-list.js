import { Component } from "./base-component.js";
import { ProjectStatus } from "../models/project-model.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";
export class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", `${type}-projects`);
        this.type = type;
        console.log("😎😎😎 List constructor called");
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    //implementing interface methods
    dragOverHandler(event) {
        //checking if the element is a valid drop target
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault(); //default in JS is to not allow dropping
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable"); //adding the styling while dragging over the element
        }
    }
    dropHandler(event) {
        console.log("🛑🛑dropHandler", event);
        //get the project id from the dataTransfer object
        const projId = event.dataTransfer.getData("text/plain");
        console.log("projId in dropHandler", projId);
        projectState.moveProject(projId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(event) {
        //remove the added style (in dragOverHandler)
        console.log("🙂dragLeaveHandler", event);
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    renderProjects() {
        const ul = document.getElementById(`${this.type}-projects-list`);
        ul.innerHTML = "";
        for (const project of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul").id, project);
        }
    }
    renderContent() {
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
        this.element.querySelector("ul").id = `${this.type}-projects-list`;
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler.bind(this));
        this.element.addEventListener("dragleave", this.dragLeaveHandler.bind(this));
        this.element.addEventListener("drop", this.dropHandler.bind(this));
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
    }
}

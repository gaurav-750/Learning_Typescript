import { Project } from "../models/project-model.js";
import { ProjectStatus } from "../models/project-model.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State {
    constructor() {
        super(...arguments);
        // private listeners: Listener[] = []; //array of functions, whenever something changes, we will call all these functions
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    // addListener(listenerfn: Listener) {
    //   this.listeners.push(listenerfn);
    // }
    addProject(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        console.log("🙏🙏 added new project:", this.projects);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        console.log("🙏🙏 moveProject", project);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerfn of this.listeners) {
            console.log("listenerfn", listenerfn);
            listenerfn(this.projects.slice()); //slice() is used to create a copy of the array
        }
    }
}
//! This is a global instace of ProjectState class - can access it everywhere
export const projectState = ProjectState.getInstance();

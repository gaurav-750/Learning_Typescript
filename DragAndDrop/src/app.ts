// Drag and Drop Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void; //checks if the element is a valid drop target
  dropHandler(event: DragEvent): void; //takes care of the actual dropping
  dragLeaveHandler(event: DragEvent): void; //visual feedback when the user drags something over the element
}

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

enum ProjectStatus {
  Active,
  Finished,
}

// type Listener = (projects: Project[]) => void;
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  // private listeners: Listener[] = []; //array of functions, whenever something changes, we will call all these functions
  private projects: Project[] = [];
  private static instance: ProjectState;

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

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );

    console.log("🙏🙏 added new project:", this.projects);
    this.projects.push(newProject);

    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
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
const projectState = ProjectState.getInstance();

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
    isValid = isValid && input.value >= input.min;
  }
  if (input.max !== undefined && typeof input.value === "number") {
    isValid = isValid && input.value <= input.max;
  }

  return isValid;
}

//Generic class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement; //template
  hostElement: T; //jaha par hume ye template dalna hai
  element: U;

  constructor(templateId: string, hostId: string, newElementId?: string) {
    //reference to both the elements
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById(hostId)! as T;

    //this is the copy of the template
    const importNode = document.importNode(this.templateElement.content, true);

    //* this is the 'form' element, which is the first child of the template
    this.element = importNode.firstElementChild as U;

    if (newElementId) {
      this.element.id = newElementId; //adding id to the form element
    }
    console.log(this.element);

    this.addToDiv();
  }

  private addToDiv() {
    //attach the form element to the div element
    this.hostElement.appendChild(this.element);
  }

  //* abstract methods
  abstract configure?(): void;
  abstract renderContent(): void;
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super("project-input", "app", "user-input");
    console.log("constructor called");

    //* referencing the input elements
    this.titleInput = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  //* Methods
  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent(): void {}

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

      projectState.addProject(title, desc, people); //add to projects array in the ProjectState class
      this.clearInputs();
    }
  }
}

class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get Persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, project.id);

    this.project = project;

    this.configure();
    this.renderContent();
  }

  dragStartHandler(event: DragEvent): void {
    console.log("👍dragStartHandler", event, this.project);

    event.dataTransfer!.setData("text/plain", this.project.id); //setting the data to be transferred
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent): void {
    console.log("DragEnd");
  }

  configure(): void {
    this.element.addEventListener(
      "dragstart",
      this.dragStartHandler.bind(this)
    );

    this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.Persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

//ProjectList Class
class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", `${type}-projects`);
    console.log("😎😎😎 List constructor called");

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  //implementing interface methods
  dragOverHandler(event: DragEvent): void {
    //checking if the element is a valid drop target
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault(); //default in JS is to not allow dropping

      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable"); //adding the styling while dragging over the element
    }
  }

  dropHandler(event: DragEvent): void {
    console.log("🛑🛑dropHandler", event);

    //get the project id from the dataTransfer object
    const projId = event.dataTransfer!.getData("text/plain");
    console.log("projId in dropHandler", projId);

    projectState.moveProject(
      projId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  dragLeaveHandler(event: DragEvent): void {
    //remove the added style (in dragOverHandler)
    console.log("🙂dragLeaveHandler", event);

    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  private renderProjects() {
    const ul = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    ul.innerHTML = "";
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, project);
    }
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";

    this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler.bind(this));
    this.element.addEventListener(
      "dragleave",
      this.dragLeaveHandler.bind(this)
    );
    this.element.addEventListener("drop", this.dropHandler.bind(this));

    projectState.addListener((projects: Project[]) => {
      let relevantProjects = projects.filter((project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        } else {
          return project.status === ProjectStatus.Finished;
        }
      });

      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }
}

const projectInput = new ProjectInput();

const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");

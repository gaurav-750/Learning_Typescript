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

type Listener = (projects: Project[]) => void;
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

class ProjectState {
  private listeners: Listener[] = []; //array of functions, whenever something changes, we will call all these functions
  private projects: Project[] = [];
  private static instance: ProjectState;

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerfn: Listener) {
    this.listeners.push(listenerfn);
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random.toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );

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

class ProjectItem extends Component<HTMLUListElement, HTMLElement> {
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

  configure(): void {}

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.Persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

//ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  private assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", `${type}-projects`);
    console.log("😎😎😎 List constructor called");

    this.assignedProjects = [];

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

    this.renderContent();
  }

  private renderProjects() {
    const ul = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    ul.innerHTML = "";
    for (const project of this.assignedProjects) {
      new ProjectItem(ul.id, project);
    }
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";

    this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
  }

  configure(): void {}
}

const projectInput = new ProjectInput();

const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");

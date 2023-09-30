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

    //* accessing the input elements
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

  private submitHandler(event: Event) {
    event.preventDefault();
    console.log("this", this);

    console.log(
      this.titleInput.value,
      this.descriptionInput.value,
      this.peopleInput.value
    );
  }
}

const projectInput = new ProjectInput();

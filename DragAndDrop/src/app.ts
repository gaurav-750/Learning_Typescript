class ProjectInput {
  templateElement: HTMLTemplateElement; //template
  divElement: HTMLDivElement; //jaha par hume ye template dalna hai
  element: HTMLFormElement;

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
    console.log(this.element);

    this.setDiv();
  }

  setDiv() {
    //attach the form element to the div element
    this.divElement.appendChild(this.element);
  }
}

const projectInput = new ProjectInput();

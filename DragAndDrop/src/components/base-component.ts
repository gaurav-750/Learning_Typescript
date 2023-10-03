namespace App {
  //Generic class
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
      const importNode = document.importNode(
        this.templateElement.content,
        true
      );

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
}

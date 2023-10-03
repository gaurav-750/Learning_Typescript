//Generic class
export class Component {
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

namespace App {
  export class ProjectItem
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
      this.element.querySelector("h3")!.textContent =
        this.Persons + " assigned";
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }
}

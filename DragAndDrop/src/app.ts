//importing the drag and drop interfaces (namespace)

//* Importing Modules
import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

//

//ProjectItem class

//ProjectList Class

const projectInput = new ProjectInput();

const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");

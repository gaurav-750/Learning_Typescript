//importing the drag and drop interfaces (namespace)
/// <reference path="models/drag-drop-interface.ts" />
/// <reference path="models/project-model.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="utils/validation.ts" />
/// <reference path="components/base-component.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
/// <reference path="components/project-item.ts" />

namespace App {
  //

  //ProjectItem class

  //ProjectList Class

  const projectInput = new ProjectInput();

  const activeProjects = new ProjectList("active");
  const finishedProjects = new ProjectList("finished");
}

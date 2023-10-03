// Drag and Drop Interfaces

//* using namespace

namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void; //checks if the element is a valid drop target
    dropHandler(event: DragEvent): void; //takes care of the actual dropping
    dragLeaveHandler(event: DragEvent): void; //visual feedback when the user drags something over the element
  }
}

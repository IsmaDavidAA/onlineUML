import { calculator } from "../utils/Calculator";
export const eventsSvg = {
  onMouseMoveNull: (event) => {
    event.target.style.cursor = "pointer";
  },
  onMouseUp: (event) => {
    console.log(event.view.$r.hooks[9].value);
    // currentClass = null;
    event.target.style.cursor = "default";
  },
};

import React from "react";
import { CanvasWrapper } from "./Canvas.styles";
const Canvas = (props) => {
  return (
    <CanvasWrapper
      id="canvas"
      width={props.width}
      height={props.height}
    ></CanvasWrapper>
  );
};

export default Canvas;

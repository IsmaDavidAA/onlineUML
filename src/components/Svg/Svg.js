import React from "react";
import { SvgWrapper } from "./Svg.styles";
const Canvas = (props) => {
  return (
    <SvgWrapper
      id="svg"
      width={props.width}
      height={props.height}
    ></SvgWrapper>
  );
};

export default Canvas;

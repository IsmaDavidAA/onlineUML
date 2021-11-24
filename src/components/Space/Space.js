import React from "react";
import { SpaceWrapper } from "./Space.styles";

const Space = (props) => {
  return <SpaceWrapper height={props.h} width={props.w}></SpaceWrapper>;
};

export default Space;

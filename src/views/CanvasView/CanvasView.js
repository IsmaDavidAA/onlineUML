import React from "react";
import Header from "../../components/Header/Header";
import { WrapperView } from "./CanvasView.styles";

const CanvasView = (props) => {
  return (
    <>
      <Header title={"CANVAS"} />
      <WrapperView></WrapperView>
    </>
  );
};

export default CanvasView;

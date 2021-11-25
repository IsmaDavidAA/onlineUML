import React from "react";
import DashBoard from "../../components/Dashboard/Dashboard";
import Header from "../../components/Header/Header";
import { WrapperView } from "./CanvasView.styles";

const CanvasView = (props) => {
  return (
    <>
      <Header title={"CANVAS"} />

      <WrapperView>
        <DashBoard color="#A6AFFF"></DashBoard>
      </WrapperView>
    </>
  );
};

export default CanvasView;

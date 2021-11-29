import React from "react";
import { actions } from "../../views/CanvasView/ClassEnum";
import Button from "../Button/Button";
import Space from "../Space/Space";
import { WrapperDashboard } from "./Dashboard.styles";
const DashBoard = (props) => {
  return (
    <WrapperDashboard color={props.color}>
      <Button action={props.action[1]} typeAction={actions.CREATION}>
        CLASE
      </Button>
      <Space h={10} w={10} />
      <Button action={props.action[0]} typeAction={actions.INHERITANCE}>
        HERENCIA
      </Button>
      <Space h={10} w={10} />
      <Button action={props.action[0]} typeAction={actions.DEPENDENCY}>
        DEPENDENCIA
      </Button>
    </WrapperDashboard>
  );
};

export default DashBoard;

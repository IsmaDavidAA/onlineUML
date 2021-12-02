import React from "react";
import { relations } from "../../Relations";
import Button from "../Button/Button";
import Space from "../Space/Space";
import { WrapperDashboard } from "./Dashboard.styles";
const DashBoard = (props) => {
  return (
    <WrapperDashboard color={props.color}>
      <Button action={props.action[1]} typeAction={relations.NONE}>
        CLASE
      </Button>
      <Space h={10} w={10} />
      <Button action={props.action[0]} typeAction={relations.INHERITANCE}>
        HERENCIA
      </Button>
      <Space h={10} w={10} />
      <Button action={props.action[0]} typeAction={relations.DEPENDENCY}>
        DEPENDENCIA
      </Button>
    </WrapperDashboard>
  );
};

export default DashBoard;

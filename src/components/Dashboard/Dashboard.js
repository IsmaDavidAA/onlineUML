import React from "react";
import Button from "../Button/Button";
import Space from "../Space/Space";
import { WrapperDashboard } from "./Dashboard.styles";
const DashBoard = (props) => {
  return (
    <WrapperDashboard color={props.color}>
      <Button action={props.action}>CLASE</Button>
      <Space h={10} w={10} />
      <Button>HERENCIA</Button>
      <Space h={10} w={10} />
      <Button>DEPENDENCIA</Button>
    </WrapperDashboard>
  );
};

export default DashBoard;

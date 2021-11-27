import React from "react";
import { WrapperView } from "../../GlobalStyle";
import Header from "../../components/Header/Header";
import DashBoard from "../../components/Dashboard/Dashboard";
const SvgView = (props) => {
  return (
    <>
      <Header title={"SVG"} />
      <WrapperView>
        <DashBoard color="#FF9797"></DashBoard>
      </WrapperView>
    </>
  );
};

export default SvgView;

import React from "react";
import { WrapperView } from "./SvgView.styles";
import Header from "../../components/Header/Header";
const SvgView = (props) => {
  return (
    <>
      <Header title={"SVG"} />

      <WrapperView></WrapperView>
    </>
  );
};

export default SvgView;

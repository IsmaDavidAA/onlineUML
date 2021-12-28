import React from "react";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import Space from "../../components/Space/Space";
import { Half, WrapperButton, WrapperView } from "./HomeView.styles";
import Header from "../../components/Header/Header";

const HomeView = (props) => {
  return (
    <>
      <Header title="Maria" theme="usuario"/>
      <WrapperView>
        <WrapperButton theme="svg">
          <ButtonLink texto="SVG" theme="svg" url={`/svg`}></ButtonLink>
          <Space h={10} w={10}></Space>
        </WrapperButton>
        <WrapperButton theme="canvas">
          <Space h={10} w={10}></Space>
          <ButtonLink
            texto="CANVAS"
            theme="canvas"
            url={`/canvas`}
          ></ButtonLink>
        </WrapperButton>
      </WrapperView>
    </>
  );
};

export default HomeView;

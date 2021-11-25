import React from "react";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import SeccionButton from "../../components/SeccionButton/SeccionButton";
import Space from "../../components/Space/Space";
import { WrapperView } from "./HomeView.styles";

const HomeView = (props) => {
  return (
    <>
      <WrapperView>
        <SeccionButton>
          <ButtonLink texto="SVG" color="#FF9797" url={`/svg`}></ButtonLink>
          <Space h={10} w={10}></Space>
          <ButtonLink texto="CANVAS" color="#A6AFFF" url={`/canvas`}></ButtonLink>
        </SeccionButton>
      </WrapperView>
    </>
  );
};

export default HomeView;

import React from "react";
import Button from "../../components/Button/Button";
import SeccionButton from "../../components/SeccionButton/SeccionButton";
import Space from "../../components/Space/Space";
import { WrapperView } from "./HomeView.styles";

const HomeView = (props) => {
  return (
    <>
      <WrapperView>
        <SeccionButton>
          <Button texto="SVG" color="#FF9797" url={`/svg`}></Button>
          <Space h={10} w={10}></Space>
          <Button texto="CANVAS" color="#A6AFFF" url={`/canvas`}></Button>
        </SeccionButton>
      </WrapperView>
    </>
  );
};

export default HomeView;

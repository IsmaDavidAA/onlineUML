import React, { useEffect, useState, useRef } from "react";
import { WrapperView } from "../../GlobalStyle";
import Header from "../../components/Header/Header";
import DashBoard from "../../components/Dashboard/Dashboard";
import { WrapperDesktop, WrapperSVG } from "./SvgView.styles";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import Svg from "../../components/Svg/Svg";
import { calculator } from "../../utils/Calculator";
import { relations, HORIZONTAL, VERTICAL } from "../../Constants";
import { eventsSvg } from "../../Events/Events";
const SvgView = (props) => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isOpenModalE, openModalE, closeModalE] = useModal();
  const [classes, setClasses] = useState(new Map([]));
  const [svg, setSvg] = useState(null);
  const [allGood, setAllGood] = useState(false);
  const [action, setAction] = useState(null);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 });
  const fromClass = useRef(null);
  const currentClass = useRef(null);

  const setFromClass = (className) => {
    fromClass.current = className;
  };

  const setCurrentClass = (className) => {
    currentClass.current = className;
  };
  const actualizar = (key) => {
    if (key) {
      const mySvg = document.getElementById("svg");
      const value = classes.get(key);
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );

      rect.setAttribute("x", 0);
      rect.setAttribute("y", 0);
      rect.setAttribute("width", value.width);
      rect.setAttribute("height", value.height);
      rect.setAttribute(
        "style",
        `fill:white;stroke:black;stroke-width:1;opacity:0.5`
      );
      g.setAttribute("id", key);
      g.onmousedown = (e) => eventsSvg.onMouseDown(setCurrentClass, key, e);
      g.onmousemove = (e) =>
        eventsSvg.onMouseMove(currentClass, classes, setClasses, e);
      g.onmouseup = (e) => eventsSvg.onMouseUp(setCurrentClass, e);
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", 1);
      text.setAttribute("y", 18);
      text.setAttribute("font-size", "20");
      text.setAttribute("font", "Arial");
      text.appendChild(document.createTextNode(value.name));
      let aumento = 36;

      if (value.attributes.length > 0) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("y1", aumento - 12);
        line.setAttribute("x2", value.width);
        line.setAttribute("y2", aumento - 12);
        line.setAttribute("stroke", "black");
        g.appendChild(line);
        value.attributes.forEach((attributes) => {
          const inherit = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "tspan"
          );
          inherit.setAttribute("x", 1);
          inherit.setAttribute("y", aumento);
          inherit.setAttribute("font-size", "12px");
          inherit.setAttribute("font", "Arial");
          inherit.appendChild(document.createTextNode(attributes));
          aumento += 15;
          text.appendChild(inherit);
        });
      }

      if (value.methods.length > 0) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("y1", aumento - 12);
        line.setAttribute("x2", value.width);
        line.setAttribute("y2", aumento - 12);
        line.setAttribute("stroke", "black");
        g.appendChild(line);
        value.methods.forEach((method) => {
          const inherit = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "tspan"
          );
          inherit.setAttribute("x", 1);
          inherit.setAttribute("y", aumento);
          inherit.setAttribute("font-size", "12px");
          inherit.setAttribute("font", "Arial");
          inherit.appendChild(document.createTextNode(method));
          aumento += 15;
          text.appendChild(inherit);
        });
      }
      g.appendChild(rect);
      g.appendChild(text);
      mySvg.appendChild(g);
    }
  };
  
  useEffect(() => {
    setSvg(document.getElementById("svg"));
  }, []);

  useEffect(() => {
    if (svg) {
      if (action === relations.INHERITANCE) {
        classes.forEach((value, key) => {
          const g = document.getElementById(key);
          g.onmousedown = (e) =>
            eventsSvg.onMouseDownInheritance(
              setFromClass,
              fromClass,
              key,
              value,
              classes,
              setAction,
              e
            );
          g.onmousemove = eventsSvg.onMouseMoveNull;
        });
      } else if (action === relations.NONE) {
        window.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          return false;
        });
        classes.forEach((value, key) => {
          const g = document.getElementById(key);
          g.onmousedown = (e) => eventsSvg.onMouseDown(setCurrentClass, key, e);
          g.onmousemove = (e) =>
            eventsSvg.onMouseMove(currentClass, classes, setClasses, e);
        });
      } else if (action === relations.DEPENDENCY) {
        classes.forEach((value, key) => {
          const g = document.getElementById(key);
          g.onmousedown = (e) =>
            eventsSvg.onMouseDownDependency(
              setFromClass,
              fromClass,
              key,
              value,
              classes,
              setClasses,
              setAction,
              e
            );
          g.onmousemove = eventsSvg.onMouseMoveNull;
        });
      }
    }
  }, [action]);

  useEffect(() => {
    if (svg) {
      setAction(relations.NONE);
    }
  }, [svg]);

  const addClass = (setClass, id) => {
    const idN = id ? id : calculator.generateID();
    classes.set(idN, {
      x: 10,
      y: 10,
      width: calculator.calculateWidthClass(
        setClass.methods,
        setClass.attributes,
        setClass.name
      ),
      height: calculator.calculateHeightClass(
        setClass.attributes,
        setClass.methods
      ),
      separatorLine: calculator.calculateSeparatorLine(
        setClass.methods,
        setClass.attributes
      ),
      name: `${setClass.name}`,
      color: "black",
      attributes: setClass.attributes,
      methods: setClass.methods,
      inheritances: setClass.inheritances ? setClass.inheritances : [],
      dependencies: setClass.dependencies ? setClass.dependencies : [],
    });
    actualizar(idN);
  };

  const resetColor = () => {
    classes.forEach((value, key) => {
      value.color = "black";
    });
  };

  const handleNewClass = (setClass, id, e) => {
    e.preventDefault();
    const exists = [...classes].some((value) => {
      return value[1].name === setClass.name;
    });
    if (allGood && !exists) {
      addClass(setClass, id);
      closeModal();
      setAllGood(false);
    }
  };

  return (
    <>
      <Header title={"SVG"} />
      <WrapperView>
        <WrapperDesktop>
          <DashBoard
            color="#A6AFFF"
            action={[setAction, openModal]}
          ></DashBoard>
          <WrapperSVG>
            <Svg height={550} width={900}></Svg>
          </WrapperSVG>
        </WrapperDesktop>
        <Modal isOpen={isOpenModal} closeModal={closeModal}>
          <p>NUEVA CLASE</p>
          <Form
            handleNewClass={handleNewClass}
            closeModal={closeModal}
            setAllGood={setAllGood}
            id="formClassCreate"
          />
        </Modal>
        <Modal isOpen={isOpenModalE} closeModal={closeModalE} hasClose={true}>
          <p>EDITAR CLASE</p>
          <Form
            handleNewClass={handleNewClass}
            closeModal={closeModal}
            setAllGood={setAllGood}
            id="formClassEdit"
          />
        </Modal>
      </WrapperView>
    </>
  );
};

export default SvgView;

import React, { useEffect, useState, useRef } from "react";
import { WrapperView } from "../../GlobalStyle";
import Header from "../../components/Header/Header";
import DashBoard from "../../components/Dashboard/Dashboard";
import { WrapperDesktop, WrapperBoard } from "../../GlobalStyle";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import Svg from "../../components/Svg/Svg";
import { relations } from "../../Constants";
import { eventsSvg, createLine } from "../../Events/Events";
import { useClasses } from "../../hooks/useClasses";
const SvgView = (props) => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isOpenModalE, openModalE, closeModalE] = useModal();
  const [
    classes,
    setClasses,
    action,
    setAction,
    fromClass,
    currentClass,
    setFromClass,
    setCurrentClass,
    validClass,
    setValidClass,
    addClass,
    guardar,
  ] = useClasses();
  const [svg, setSvg] = useState(null);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 });

  const actualizar = (key) => {
    if (key) {
      const mySvg = document.getElementById("svg");
      const value = classes.get(key);
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("x", 0);
      g.setAttribute("y", 0);

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
      text.setAttribute("pointer-events", "none");
      text.setAttribute("selectable", "false");
      text.setAttribute("select", "none");
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
          inherit.setAttribute("pointer-events", "none");
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
          inherit.setAttribute("pointer-events", "none");
          inherit.appendChild(document.createTextNode(method));
          aumento += 15;
          text.appendChild(inherit);
        });
      }
      value.inheritances.forEach((inheritance) => {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("y1", aumento - 12);
        line.setAttribute("x2", value.width);
        line.setAttribute("y2", aumento - 12);
        line.setAttribute("stroke", "black");
        g.appendChild(line);
      });

      value.dependencies.forEach((dependency) => {
        createLine(g, classes.get(dependency), dependency, key, value);
      });
      value.inheritances.forEach((inheritance) => {
        createLine(g, classes.get(inheritance), inheritance, key, value);
      });
      g.appendChild(rect);
      g.appendChild(text);
      mySvg.appendChild(g);
      g.setAttributeNS(
        null,
        "transform",
        "translate(" + value.x + "," + value.y + ")"
      );
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
      classes.forEach((value, key) => {
        setCurrentClass(key);
        actualizar(key);
      });
      setCurrentClass(null);
      setAction(relations.NONE);
    }
  }, [svg]);

  const handleNewClass = (setClass, id, e) => {
    e.preventDefault();
    const exists = [...classes].some((value) => {
      return value[1].name === setClass.name;
    });
    if (validClass && !exists) {
      addClass(setClass, id, actualizar);
      closeModal();
      setValidClass(false);
    }
  };

  return (
    <>
      <Header title={"SVG"} />
      <WrapperView>
        <WrapperDesktop>
          <DashBoard
            theme="svg"
            action={[setAction, openModal, guardar]}
          ></DashBoard>
          <WrapperBoard>
            <Svg height={550} width={900}></Svg>
          </WrapperBoard>
        </WrapperDesktop>
        <Modal isOpen={isOpenModal} closeModal={closeModal}>
          <p>NUEVA CLASE</p>
          <Form
            handleNewClass={handleNewClass}
            closeModal={closeModal}
            setAllGood={setValidClass}
            id="formClassCreate"
          />
        </Modal>
        <Modal isOpen={isOpenModalE} closeModal={closeModalE} hasClose={true}>
          <p>EDITAR CLASE</p>
          <Form
            handleNewClass={handleNewClass}
            closeModal={closeModal}
            setAllGood={setValidClass}
            id="formClassEdit"
          />
        </Modal>
      </WrapperView>
    </>
  );
};

export default SvgView;

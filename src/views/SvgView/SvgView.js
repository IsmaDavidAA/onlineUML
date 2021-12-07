import React, { useEffect, useState } from "react";
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
const SvgView = (props) => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isOpenModalE, openModalE, closeModalE] = useModal();
  const [classes, setClasses] = useState(new Map([]));
  const [svg, setSvg] = useState(null);
  const [allGood, setAllGood] = useState(false);
  const [action, setAction] = useState(null);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 });
  var currentClass = null;
  var fromClass = null;

  const actualizar = (key) => {
    if (key) {
      const mySvg = document.getElementById("svg");
      const value = classes.get(key);
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );

      rect.setAttribute("x", value.x);
      rect.setAttribute("y", value.y);
      rect.setAttribute("width", value.width);
      rect.setAttribute("height", value.height);
      rect.setAttribute(
        "style",
        `fill:white;stroke:black;stroke-width:1;opacity:0.5`
      );
      g.setAttribute("id", key);
      g.onmousedown = (event) => {
        if (event.button === 0) {
          currentClass = key;
        } else if (event.button === 2) {
        }
      };
      g.onmousemove = (event) => {
        if (currentClass) {
          const newValue = {
            ...classes.get(currentClass),
            x: event.clientX - HORIZONTAL - classes.get(currentClass).width / 2,
            y: event.clientY - VERTICAL - classes.get(currentClass).height / 2,
          };
          document
            .getElementById(currentClass)
            .setAttributeNS(
              null,
              "transform",
              "translate(" + newValue.x + "," + newValue.y + ")"
            );
          classes.set(currentClass, newValue);
          setClasses(classes);
        }
      };
      g.onmouseup = (event) => {
        currentClass = null;
      };
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", value.x + 1);
      text.setAttribute("y", value.y + 20);
      text.appendChild(document.createTextNode(value.name));
      g.appendChild(rect);
      g.appendChild(text);

      mySvg.appendChild(g);
    }
  };

  const linesDependenciesGenerate = (value) => {};
  const linesInheritanceGenerate = (value) => {};

  useEffect(() => {
    setSvg(document.getElementById("svg"));
  }, []);

  useEffect(() => {
    if (svg && action === relations.INHERITANCE) {
      classes.forEach((value, key) => {
        console.log(value);
      });
      actualizar();
    } else if (svg && action === relations.NONE) {
      window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
      });
      resetColor();
      actualizar();

      classes.forEach((value, key) => {
        console.log(value);
      });
      actualizar();
    } else if (svg && action === relations.DEPENDENCY) {
      actualizar();
      classes.forEach((value, key) => {
        console.log(value);
      });

      actualizar();
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

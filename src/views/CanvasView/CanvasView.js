import React, { useState, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import DashBoard from "../../components/Dashboard/Dashboard";
import Header from "../../components/Header/Header";
import { WrapperView } from "../../GlobalStyle";
import { WrapperCanvas, WrapperDescktop } from "./CanvasView.styles";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import { calculator } from "../../utils/Calculator.js";
import { relations, HORIZONTAL, VERTICAL } from "../../Constants";
import Menu from "../../components/Menu/Menu";
import Form from "../../components/Form/Form";
const CanvasView = (props) => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isOpenModalE, openModalE, closeModalE] = useModal();
  const [classes, setClasses] = useState(new Map([]));
  const [cv, setCv] = useState();
  const [cx, setCx] = useState();
  const [allGood, setAllGood] = useState(false);
  const [action, setAction] = useState(null);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 });
  var currentClass = null;
  var fromClass = null;

  function actualizar() {
    cx.fillStyle = "#f0f0f0";
    cx.fillRect(0, 0, 900, 550);
    classes.forEach((value, key) => {
      cx.font = "20px Arial";
      cx.fillStyle = "white";
      cx.strokeStyle = value.color;
      cx.strokeRect(value.x, value.y, value.width, value.height);
      cx.fillStyle = "black";
      cx.fillText(value.name, value.x + 1, value.y + 20);
      cx.beginPath();
      cx.moveTo(value.x, value.y + 24);
      cx.lineTo(value.x + value.width, value.y + 24);
      if (value.separatorLine) {
        cx.moveTo(value.x, value.y + value.separatorLine);
        cx.lineTo(value.x + value.width, value.y + value.separatorLine);
      }
      cx.strokeStyle = value.color;
      cx.stroke();
      let aumento = 36;
      cx.font = "12px Arial";
      cx.strokeStyle = "black";
      value.attributes.forEach((element) => {
        cx.fillText(element, value.x + 1, value.y + aumento);
        aumento += 15;
      });
      // eslint-disable-next-line no-loop-func
      value.methods.forEach((element) => {
        cx.fillText(element, value.x + 1, value.y + aumento);
        aumento += 15;
      });

      if (value.inheritances !== undefined) {
        linesInheritanceGenerate(value);
      }
      if (value.dependencies !== undefined) {
        linesDependenciesGenerate(value);
      }
    });
  }
  const linesDependenciesGenerate = (value) => {
    value.dependencies.forEach((dependencyKey) => {
      cx.beginPath();
      cx.moveTo(value.x + value.width / 2, value.y);
      cx.lineTo(
        classes.get(dependencyKey).x + classes.get(dependencyKey).width / 2,
        classes.get(dependencyKey).y + classes.get(dependencyKey).height
      );
      cx.strokeStyle = "black";
      cx.stroke();
    });
  };
  const linesInheritanceGenerate = (value) => {
    cx.beginPath();
    value.inheritances.forEach((inheritanceKey) => {
      cx.moveTo(value.x + value.width / 2, value.y);
      cx.lineTo(
        classes.get(inheritanceKey).x + classes.get(inheritanceKey).width / 2,
        classes.get(inheritanceKey).y + classes.get(inheritanceKey).height
      );
      cx.strokeStyle = "black";
      cx.stroke();
    });
  };

  useEffect(() => {
    setCv(document.getElementById("canvas"));
  }, []);

  useEffect(() => {
    if (cv) {
      setCx(cv.getContext("2d"));
    }
  }, [cv]);

  useEffect(() => {
    if (cx && action === relations.INHERITANCE) {
      actualizar();

      cv.onmousedown = (event) => {
        if (event.button === 0) {
          classes.forEach((value, key) => {
            if (calculator.isItOverClass(value, event)) {
              if (!fromClass) {
                value.color = "blue";
                fromClass = key;
              } else if (fromClass !== key) {
                classes.get(fromClass).inheritances = [key];
                setAction(relations.NONE);
                fromClass = null;
              }
            }
          });
        } else {
          setAction(relations.NONE);
        }
        actualizar();
      };

      cv.onmousemove = function (event) {
        onMouseMoveSelectClass(event);
      };
    } else if (cx && action === relations.NONE) {
      window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
      });
      resetColor();
      actualizar();

      cv.oncontextmenu = function () {
        return false;
      };
      cv.onmousedown = (event) => {
        if (event.button === 0) {
          classes.forEach((value, key) => {
            if (calculator.isItOverClass(value, event)) {
              currentClass = value;
            }
          });
          setVisibleMenu(false);
        } else if (event.button === 2) {
          classes.forEach((value, key) => {
            if (calculator.isItOverClass(value, event)) {
              setPositionMenu({ x: event.clientX, y: event.clientY });
              setVisibleMenu(true);
            }
          });
        }
      };

      cv.onmousemove = function (event) {
        onMouseMoveSelectClass(event);
        if (currentClass != null) {
          currentClass.x = event.clientX - HORIZONTAL - currentClass.width / 2;
          currentClass.y = event.clientY - VERTICAL - currentClass.height / 2;
        }
        actualizar();
      };

      cv.onmouseup = function (event) {
        currentClass = null;
      };
    } else if (cx && action === relations.DEPENDENCY) {
      actualizar();
      cv.oncontextmenu = function () {
        return false;
      };
      cv.onmousedown = (event) => {
        if (event.button === 0) {
          classes.forEach((value, key) => {
            if (calculator.isItOverClass(value, event)) {
              if (!fromClass) {
                value.color = "blue";
                fromClass = key;
              } else if (fromClass !== key) {
                console.log(classes.get(fromClass).dependencies);
                if (!classes.get(fromClass).dependencies.includes(key)) {
                  classes.get(fromClass).dependencies.push(key);
                  setAction(relations.NONE);
                  fromClass = null;
                }
              }
            }
          });
        } else {
          setAction(relations.NONE);
        }
        actualizar();
      };

      cv.onmousemove = function (event) {
        onMouseMoveSelectClass(event);
      };
    }
  }, [action]);

  const onMouseMoveSelectClass = (event) => {
    classes.forEach((value, key) => {
      if (calculator.isItOverClass(value, event)) {
        event.target.style.cursor = "pointer";
      } else {
        event.target.style.cursor = "default";
      }
    });
  };

  useEffect(() => {
    if (cx) {
      setAction(relations.NONE);
    }
  }, [cx]);

  const addClass = (setClass, id) => {
    classes.set(id ? id : calculator.generateID(), {
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
      <WrapperView>
        <Header title={"CANVAS"} />
        <Menu
          visible={visibleMenu}
          top={positionMenu.y}
          left={positionMenu.x}
          actions={[openModalE, setVisibleMenu]}
        />
        <WrapperDescktop>
          <DashBoard
            color="#A6AFFF"
            action={[setAction, openModal]}
          ></DashBoard>
          <WrapperCanvas>
            <Canvas height={550} width={900}></Canvas>
          </WrapperCanvas>
        </WrapperDescktop>
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

export default CanvasView;

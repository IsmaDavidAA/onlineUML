import React, { useState, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import DashBoard from "../../components/Dashboard/Dashboard";
import Header from "../../components/Header/Header";
import { WrapperView } from "../../GlobalStyle";
import { WrapperCanvas, WrapperDesktop } from "./CanvasView.styles";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import { calculator } from "../../utils/Calculator.js";
import { relations, HORIZONTAL, VERTICAL } from "../../Constants";
import Menu from "../../components/Menu/Menu";
import Form from "../../components/Form/Form";
import { useClasses } from "../../hooks/useClasses";
import { eventsCanvas } from "../../Events/Events";
const CanvasView = (props) => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [isOpenModalE, openModalE, closeModalE] = useModal();
  const [cv, setCv] = useState();
  const [cx, setCx] = useState();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [positionMenu, setPositionMenu] = useState({ x: 0, y: 0 });
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

  

  function borrar() {
    document.getElementById("formClassCreate").reset();
  }

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
    if (cx) {
      if (action === relations.INHERITANCE) {
        actualizar();

        cv.onmousedown = (e) =>
          eventsCanvas.onMouseDown(
            actualizar,
            classes,
            fromClass,
            setAction,
            setFromClass,
            e
          );

        cv.onmousemove = function (event) {
          onMouseMoveSelectClass(event);
        };
      } else if (action === relations.NONE) {
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
                setCurrentClass(key);
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
          if (currentClass.current) {
            const newValue = {
              ...classes.get(currentClass.current),
              x:
                event.clientX -
                HORIZONTAL -
                classes.get(currentClass.current).width / 2,
              y:
                event.clientY -
                VERTICAL -
                classes.get(currentClass.current).height / 2,
            };
            classes.set(currentClass.current, newValue);
            setClasses(classes);
          }
          actualizar();
        };

        cv.onmouseup = function (event) {
          setCurrentClass(null);
        };
      } else if (action === relations.DEPENDENCY) {
        actualizar();
        cv.oncontextmenu = function () {
          return false;
        };
        cv.onmousedown = (event) => {
          if (event.button === 0) {
            classes.forEach((value, key) => {
              if (calculator.isItOverClass(value, event)) {
                if (!fromClass.current) {
                  value.color = "blue";
                  fromClass.current = key;
                } else if (fromClass.current !== key) {
                  if (
                    !classes.get(fromClass.current).dependencies.includes(key)
                  ) {
                    classes.get(fromClass.current).dependencies.push(key);
                    setAction(relations.NONE);
                    setFromClass(null);
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
    if (validClass && !exists) {
      addClass(setClass, id);
      closeModal();
      setValidClass(false);
      borrar();
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
        <WrapperDesktop>
          <DashBoard
            color="#A6AFFF"
            clases={classes}
            action={[setAction, openModal, guardar]}
          ></DashBoard>
          <WrapperCanvas>
            <Canvas height={550} width={900}></Canvas>
          </WrapperCanvas>
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
export default CanvasView;

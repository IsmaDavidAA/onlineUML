import React, { useState, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import DashBoard from "../../components/Dashboard/Dashboard";
import Header from "../../components/Header/Header";
import { WrapperView } from "../../GlobalStyle";
import { WrapperBoard, WrapperDesktop } from "../../GlobalStyle";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import { relations } from "../../Constants";
import Menu from "../../components/Menu/Menu";
import Form from "../../components/Form/Form";
import { useClasses } from "../../hooks/useClasses";
import { eventsCanvas, onMouseMoveSelectClass } from "../../Events/Events";
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
      actualizar();
      if (action === relations.INHERITANCE) {
        cv.onmousedown = (e) =>
          eventsCanvas.onMouseInheritances(
            actualizar,
            classes,
            fromClass,
            setAction,
            setFromClass,
            e
          );
        cv.onmousemove = (e) => onMouseMoveSelectClass(classes, e);
      } else if (action === relations.NONE) {
        window.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          return false;
        });
        resetColor();
        cv.oncontextmenu = function () {
          return false;
        };
        cv.onmousedown = (e) =>
          eventsCanvas.onMouseCommonDown(
            classes,
            setCurrentClass,
            setVisibleMenu,
            setPositionMenu,
            e
          );
        cv.onmousemove = (e) =>
          eventsCanvas.onMouseMove(
            classes,
            setClasses,
            currentClass,
            actualizar,
            e
          );
        cv.onmouseup = () => setCurrentClass(null);
      } else if (action === relations.DEPENDENCY) {
        cv.oncontextmenu = () => {
          return false;
        };
        cv.onmousedown = (e) =>
          eventsCanvas.onMouseDependencyDown(
            classes,
            fromClass,
            setAction,
            setFromClass,
            actualizar,
            e
          );
        cv.onmousemove = (e) => onMouseMoveSelectClass(classes, e);
      }
    }
  }, [action]);

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
            theme="canvas"
            action={[setAction, openModal, guardar]}
          ></DashBoard>
          <WrapperBoard>
            <Canvas height={550} width={900}></Canvas>
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
export default CanvasView;

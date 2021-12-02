import React, { useState, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import DashBoard from "../../components/Dashboard/Dashboard";
import Header from "../../components/Header/Header";
import { WrapperView } from "../../GlobalStyle";
import { WrapperCanvas, WrapperDescktop } from "./CanvasView.styles";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import { calculator } from "../../utils/Calculator.js";
import { relations } from "../../Relations";
const CanvasView = (props) => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [clases, setClases] = useState([]);
  const [cv, setCv] = useState(document.getElementById("canvas"));
  const [cx, setCx] = useState();
  const [allGood, setAllGood] = useState(false);
  const VERTICAL = 50;
  const HORIZONTAL = 120;
  const [action, setAction] = useState(null);
  var currentClass = null;
  var fromClass = null;

  function actualizar() {
    cx.fillStyle = "#f0f0f0";
    cx.fillRect(0, 0, 900, 550);
    for (var i = 0; i < clases.length; i++) {
      cx.font = "20px Arial";
      cx.fillStyle = "white";
      cx.strokeStyle = clases[i].color;
      cx.strokeRect(
        clases[i].x,
        clases[i].y,
        clases[i].width,
        clases[i].height
      );

      cx.fillStyle = "black";
      cx.fillText(clases[i].name, clases[i].x + 1, clases[i].y + 20);
      cx.beginPath();
      cx.moveTo(clases[i].x, clases[i].y + 24);
      cx.lineTo(clases[i].x + clases[i].width, clases[i].y + 24);
      if (clases[i].separatorLine) {
        cx.moveTo(clases[i].x, clases[i].y + clases[i].separatorLine);
        cx.lineTo(
          clases[i].x + clases[i].width,
          clases[i].y + clases[i].separatorLine
        );
      }
      cx.strokeStyle = clases[i].color;
      cx.stroke();
      let aumento = 36;
      cx.font = "12px Arial";
      cx.strokeStyle = "black";
      // eslint-disable-next-line no-loop-func
      clases[i].attributes.forEach((element) => {
        cx.fillText(element, clases[i].x + 1, clases[i].y + aumento);
        aumento += 15;
      });
      // eslint-disable-next-line no-loop-func
      clases[i].methods.forEach((element) => {
        cx.fillText(element, clases[i].x + 1, clases[i].y + aumento);
        aumento += 15;
      });

      if (clases[i].inheritances !== undefined) {
        linesInheritanceGenerate(i);
      }
    }
  }

  function linesInheritanceGenerate(i) {
    cx.beginPath();
    for (var j = 0; j < clases[i].inheritances.length; j++) {
      cx.moveTo(clases[i].x + clases[i].width / 2, clases[i].y);
      cx.lineTo(
        clases[i].inheritances[j].x + clases[i].inheritances[j].width / 2,
        clases[i].inheritances[j].y + clases[i].inheritances[j].height
      );
      cx.strokeStyle = clases[i].inheritances[j].color;
      cx.stroke();
    }
  }

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
      cv.oncontextmenu = function () {
        return false;
      };
      cv.onmousedown = (event) => {
        if (event.button === 0) {
          for (var i = 0; i < clases.length; i++) {
            if (isItOverClass(i, event)) {
              if (!fromClass) {
                clases[i].color = "blue";
                fromClass = clases[i];
              } else if (fromClass !== clases[i]) {
                fromClass.inheritances = [clases[i]];
                setAction(relations.NONE);
                fromClass = null;
              }
            }
          }
        } else {
          setAction(relations.NONE);
        }
        actualizar();
      };

      cv.onmousemove = function (event) {
        onMouseMoveSelectClass(event);
      };

      cv.onmouseup = function (event) {
        currentClass = null;
      };
    } else if (cx && action === relations.NONE) {
      resetColor();
      actualizar();

      cv.oncontextmenu = function () {
        return false;
      };
      cv.onmousedown = (event) => {
        if (event.button === 0) {
          for (var i = 0; i < clases.length; i++) {
            if (isItOverClass(i, event)) {
              currentClass = clases[i];
              break;
            }
          }
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
    }
  }, [action]);

  const onMouseMoveSelectClass = (event) => {
    for (var i = 0; i < clases.length; i++) {
      if (isItOverClass(i, event)) {
        event.target.style.cursor = "pointer";
        break;
      } else {
        event.target.style.cursor = "default";
      }
    }
  };
  const isItOverClass = (i, event) => {
    return (
      clases[i].x < event.clientX - HORIZONTAL &&
      clases[i].width + clases[i].x > event.clientX - HORIZONTAL &&
      clases[i].y < event.clientY - VERTICAL &&
      clases[i].height + clases[i].y > event.clientY - VERTICAL
    );
  };
  useEffect(() => {
    if (cx) {
      setAction(relations.NONE);
    }
  }, [cx]);

  const addClass = (name, attributes, methods) => {
    clases.push({
      x: 10,
      y: 10,
      width: calculator.calculateWidthClass(methods, attributes, name),
      height: calculator.calculateHeightClass(attributes, methods),
      separatorLine: calculator.calculateSeparatorLine(methods, attributes),
      name: `${name}`,
      color: "black",
      attributes: attributes,
      methods: methods,
      inheritances: [],
      dependencies: [],
    });
  };

  const resetColor = () => {
    for (var i = 0; i < clases.length; i++) {
      clases[i].color = "black";
    }
  };

  const handleNewClass = (e) => {
    e.preventDefault();
    const { nombre, atributesList, methodsList } = e.target.elements;
    if (allGood) {
      let attributes = atributesList.children;
      let attributesValues = [];
      for (var i = 0; i < attributes.length; i++) {
        if (attributes[i].className === "attribute") {
          attributesValues.push(attributes[i].value);
        }
      }
      let methods = methodsList.children;
      let methodsValues = [];
      for (var i = 0; i < methods.length; i++) {
        if (methods[i].className === "method") {
          methodsValues.push(methods[i].value);
        }
      }
      addClass(nombre.value, attributesValues, methodsValues);
      closeModal();
      setAllGood(false);
    }
  };

  return (
    <>
      <WrapperView>
        <Header title={"CANVAS"} />
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
          <form onSubmit={handleNewClass} id="formClass">
            <label>
              Nombre:
              <input
                type="text"
                placeholder="Nombre de la clase"
                name="nombre"
                required={true}
              />
            </label>
            <br></br>
            <fieldset id="atributos" name="atributesList">
              <legend>Atributos:</legend>
              <input
                type="text"
                id="inputAtributo"
                placeholder="Nuevo atributo"
              />
              <button
                onClick={() => {
                  const form = document.getElementById("atributos");
                  const val = document.createElement("input");
                  val.disabled = true;
                  val.className = "attribute";
                  val.value = document.getElementById("inputAtributo").value;
                  const br = document.createElement("br");
                  form.appendChild(br);
                  form.appendChild(val);
                }}
              >
                ADD
              </button>
            </fieldset>
            <br></br>
            <fieldset id="methods" name="methodsList">
              <legend>Metodos:</legend>
              <input type="text" id="inputMethod" placeholder="Nuevo metodo" />
              <button
                onClick={() => {
                  const form = document.getElementById("methods");
                  const val = document.createElement("input");
                  val.disabled = true;
                  val.className = "method";
                  val.value = document.getElementById("inputMethod").value;
                  const br = document.createElement("br");
                  form.appendChild(br);
                  form.appendChild(val);
                }}
              >
                ADD
              </button>
            </fieldset>
            <Button
              action={() => {
                closeModal();
              }}
            >
              CANCELAR
            </Button>
            <input
              type="submit"
              value="CREAR CLASE"
              onClick={() => {
                setAllGood(true);
              }}
            />
          </form>
        </Modal>
      </WrapperView>
    </>
  );
};

export default CanvasView;

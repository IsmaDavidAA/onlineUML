import React, { useState, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import DashBoard from "../../components/Dashboard/Dashboard";
import Header from "../../components/Header/Header";
import { WrapperView } from "../../GlobalStyle";
import { WrapperCanvas, WrapperDescktop } from "./CanvasView.styles";
import { ClaseModel } from "../../types/clase";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
const CanvasView = (props) => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [clases, setClases] = useState([]);
  const [inicioX, setInicioX] = useState(0);
  const [inicioY, setInicioY] = useState(0);
  const [cv, setCv] = useState(document.getElementById("canvas"));
  const [cx, setCx] = useState();
  const [atributos, setAtributos] = useState([]);
  const [allGood, setAllGood] = useState(false);
  const VERTICAL = 50;
  const HORIZONTAL = 120;
  var objetoActual = null;

  function actualizar() {
    cx.fillStyle = "#f0f0f0";
    cx.fillRect(0, 0, 900, 550);
    for (var i = 0; i < clases.length; i++) {
      cx.font = "22px Arial";
      cx.fillStyle = "white";
      cx.strokeStyle = "black";
      cx.strokeRect(
        clases[i].x,
        clases[i].y,
        clases[i].width,
        clases[i].height
      );

      cx.fillStyle = "black";
      cx.fillText(clases[i].name, clases[i].x + 2, clases[i].y + 20);
      cx.beginPath();
      cx.moveTo(clases[i].x, clases[i].y + 24);
      cx.lineTo(clases[i].x + clases[i].width, clases[i].y + 24);
      cx.stroke();
      console.log(clases[i].attributes);
      let aumento = 40;
      cx.font = "16px Arial";
      cx.strokeStyle = "black";
      clases[i].attributes.forEach((element) => {
        cx.fillText(element, clases[i].x + 2, clases[i].y + aumento);
        aumento += 21;
      });
    }
  }
  useEffect(() => {
    setCv(document.getElementById("canvas"));
  }, []);
  useEffect(() => {
    if (cv) {
      setCx(cv.getContext("2d"));
      console.log(cv, cx);
    }
  }, [cv]);
  useEffect(() => {
    if (cx) {
      console.log(cv, cx);
      actualizar();
      cv.onmousedown = function (event) {
        if (event.button === 0) {
          for (var i = 0; i < clases.length; i++) {
            if (
              clases[i].x < event.clientX - HORIZONTAL &&
              clases[i].width + clases[i].x > event.clientX - HORIZONTAL &&
              clases[i].y < event.clientY - VERTICAL &&
              clases[i].height + clases[i].y > event.clientY - VERTICAL
            ) {
              objetoActual = clases[i];
              setInicioY(event.clientY - clases[i].y - VERTICAL);
              setInicioX(event.clientX - clases[i].x - HORIZONTAL);
              break;
            }
          }
        }
      };

      cv.onmousemove = function (event) {
        if (objetoActual != null) {
          objetoActual.x =
            event.clientX - inicioX - HORIZONTAL - objetoActual.width / 2;
          objetoActual.y =
            event.clientY - inicioY - VERTICAL - objetoActual.height / 2;
        }
        actualizar();
      };

      cv.onmouseup = function (event) {
        objetoActual = null;
      };
    }
  }, [cx]);

  const dibujar = (name, attributes) => {
    clases.push({
      x: 10,
      y: 10,
      width: 80,
      height: 50,
      color: "green",
      name: `${name}`,
      attributes: attributes,
    });
  };
  const handleNewClass = (e) => {
    e.preventDefault();
    const { nombre, atributesList } = e.target.elements;
    console.log(nombre.value, atributesList, e);
    if (allGood) {
      let attributes = atributesList.children;
      let attributesValues = [];
      for (var i = 0; i < attributes.length; i++) {
        if (attributes[i].className === "attribute") {
          attributesValues.push(attributes[i].value);
        }
      }
      dibujar(nombre.value, attributesValues);
      closeModal();
      setAllGood(false);
    }
  };

  return (
    <>
      <WrapperView>
        <Header title={"CANVAS"} />
        <WrapperDescktop>
          <DashBoard color="#A6AFFF" action={openModal}></DashBoard>
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

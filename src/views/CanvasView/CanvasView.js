import React, { useState, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import DashBoard from "../../components/Dashboard/Dashboard";
import Header from "../../components/Header/Header";
import { WrapperView } from "../../GlobalStyle";
import { WrapperCanvas, WrapperDescktop } from "./CanvasView.styles";
import { ClaseModel } from "../../types/clase";
const CanvasView = (props) => {
  const [clases, setClases] = useState([]);
  const [inicioX, setInicioX] = useState(0);
  const [inicioY, setInicioY] = useState(0);
  const [cv, setCv] = useState(document.getElementById("canvas"));
  const [cx, setCx] = useState();
  const VERTICAL = 50;
  const HORIZONTAL = 120;
  var objetoActual = null;

  function actualizar() {
    cx.fillStyle = "#f0f0f0";
    cx.fillRect(0, 0, 900, 550);
    for (var i = 0; i < clases.length; i++) {
      cx.font = "22px Arial";
      cx.fillStyle = clases[i].color;
      cx.fillRect(clases[i].x, clases[i].y, clases[i].width, clases[i].height);
      cx.fillStyle = "black";
      cx.fillText(clases[i].name, clases[i].x, clases[i].y + clases[i].height);
    }
  }
  useEffect(() => {
    setCv(document.getElementById("canvas"));
    console.log("wololo");
  }, []);
  useEffect(() => {
    if (cv) {
      setCx(cv.getContext("2d"));
    }
  }, [cv]);
  const dibujar = () => {
    clases.push({
      x: 10,
      y: 10,
      width: 80,
      height: 50,
      color: "green",
      name: "Perro",
    });
  };

  window.onload = () => {
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
  };

  return (
    <>
      <WrapperView>
        <Header title={"CANVAS"} />
        <WrapperDescktop>
          <DashBoard color="#A6AFFF" action={dibujar}></DashBoard>
          <WrapperCanvas>
            <Canvas height={550} width={900}></Canvas>
          </WrapperCanvas>
        </WrapperDescktop>
      </WrapperView>
    </>
  );
};

export default CanvasView;

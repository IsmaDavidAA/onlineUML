import React, { useState, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import DashBoard from "../../components/Dashboard/Dashboard";
import Header from "../../components/Header/Header";
import { WrapperView } from "../../GlobalStyle";
import { WrapperCanvas, WrapperDescktop } from "./CanvasView.styles";
const CanvasView = (props) => {
  const [clases, setClases] = useState([]);
  const [inicioX, setInicioX] = useState(0);
  const [inicioY, setInicioY] = useState(0);
  const [claseActual, setClaseActual] = useState(null);
  const [cv, setCv] = useState(document.getElementById("canvas"));
  const [cx, setCx] = useState();
  const vertical = 50;
  const horizontal = 120;
  var objetoActual = null;

  function actualizar() {
    cx.fillStyle = "#f0f0f0";
    cx.fillRect(0, 0, 900, 550);
    for (var i = 0; i < clases.length; i++) {
      cx.fillStyle = clases[i].color;
      cx.fillRect(clases[i].x, clases[i].y, clases[i].width, clases[i].height);
    }
  }
  useEffect(() => {
    // if (document.getElementById("canvas")) {
    setCv(document.getElementById("canvas"));
    console.log("wololo");
    // }
  }, []);
  useEffect(() => {
    if (cv) {
      setCx(cv.getContext("2d"));
    }
  }, [cv]);
  const dibujar = () => {
    clases.push({ x: 10, y: 10, width: 40, height: 20, color: "green" });
  };

  window.onload = () => {
    clases.push({
      x: 10,
      y: 10,
      width: 10,
      height: 20,
      color: "#00f",
    });
    actualizar();

    cv.onmousedown = function (event) {
      for (var i = 0; i < clases.length; i++) {
        if (
          clases[i].x < event.clientX - horizontal &&
          clases[i].width + clases[i].x > event.clientX - horizontal &&
          clases[i].y < event.clientY - vertical &&
          clases[i].height + clases[i].y > event.clientY - vertical
        ) {
          setClaseActual(clases[i]);
          objetoActual = clases[i];
          setInicioY(event.clientY - clases[i].y - vertical);
          setInicioX(event.clientX - clases[i].x - horizontal);
          break;
        }
      }
    };

    cv.onmousemove = function (event) {
      if (objetoActual != null) {
        let claseTemp = claseActual;
        objetoActual.x = event.clientX - inicioX - horizontal;
        objetoActual.y = event.clientY - inicioY - vertical;
        setClaseActual(claseTemp);
      }
      actualizar();
    };

    cv.onmouseup = function (event) {
      setClaseActual(null);
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
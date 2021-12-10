import { HORIZONTAL, VERTICAL } from "../Constants";

const calculatorDireccion = (claseA, claseB) => {
  var coorA = calculatorCoordenada(claseA);
  var coorB = calculatorCoordenada(claseB);
  if(interseccion(claseA, claseB)){
    if(claseA.y>claseB.y){
      return {origen: coorA.n, destino: coorB.s};
    }else if(claseA.x < claseB.x){
      return {origen: coorA.e, destino: coorB.o};
    }else if(claseA.y < claseB.y){
      return {origen: coorA.n, destino: coorB.s};
    }else if(claseA.x>claseB.x){
      return {origen: coorA.o, destino: coorB.e};
    }
  }else if(claseA.y > claseB.y){
    if(claseA.x > claseB.x){
      return {origen: coorA.s, destino: coorB.e};
    }else if(claseA.x < claseB){
      return {origen: coorA.s, destino: coorB.e};
    }
  }else if(claseA.y < claseB.y){
    if(claseA.x > claseB.x){
      return {origen: claseA.s, destino: claseB.e};
    }else if(claseA.x < claseB){
      return {origen: claseA.s, destino: claseB.e};
    }
  }
};
function interseccion(claseA, claseB){
  if(claseA.x < claseB.x){
    return true;
  }else if(claseA.y<claseB.y){
    return true;
  }else{
    return false;
  }
}
var claseP={height: 54, width: 60, x: 314, y: 278};
var clase2={height: 86, width: 72, x: 192, y: 149};
console.log(calculatorCoordenada(claseP));

function calculatorCoordenada(claseA){
  var PtoNorte = {x: claseA.x + claseA.width/2, y: claseA.y+claseA.height};
  var PtoSur = {x: claseA.y + claseA.height, y: claseA.x + claseA.width/2};
  var PtoOeste = {x: claseA.x, y: claseA.y + claseA.height/2};
  var PtoEste = {x: claseA.x, y: claseA.y+claseA.height/2};
  return {n: PtoNorte, s: PtoSur, o:PtoOeste, e:PtoEste};
};
export const calculator = {
  calculateHeightClass: (attributes, methods) => {
    return 22 + 16 * attributes.length + 16 * methods.length;
  },
  calculateWidthClass: (methods, attributes, name) => {
    let max = 0;
    attributes.forEach((element) => {
      if (element.length > max) {
        max = element.length;
      }
    });
    methods.forEach((element) => {
      if (element.length > max) {
        max = element.length;
      }
    });
    return max * 7.5 > name.length * 12 ? max * 7.5 : name.length * 12;
  },

  calculateSeparatorLine: (methods, attributes) => {
    return methods?.length > 0 ? 22 + 16 * attributes.length : null;
  },

  generateID: () => {
    return (
      Date.now().toString(36) + Math.random().toString(36).substr(2)
    ).toUpperCase();
  },

  isItOverClass: (value, event) => {
    return (
      value.x < event.clientX - HORIZONTAL &&
      value.width + value.x > event.clientX - HORIZONTAL &&
      value.y < event.clientY - VERTICAL &&
      value.height + value.y > event.clientY - VERTICAL
    );
  },

  existOnInputList: (list, input) => {
    return list.length > 0 ? list.some((element) => element === input) : false;
  },
};

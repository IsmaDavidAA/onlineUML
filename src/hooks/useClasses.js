import { useState, useEffect, useRef } from "react";
import { calculator } from "../utils/Calculator";
export const useClasses = (initialValue = false) => {
  const [classes, setClasses] = useState(new Map());
  const [action, setAction] = useState(null);
  const [validClass, setValidClass] = useState(false);
  const fromClass = useRef(initialValue);
  const currentClass = useRef(initialValue);
  const setFromClass = (className) => {
    fromClass.current = className;
  };

  const setCurrentClass = (className) => {
    currentClass.current = className;
  };
  const addClass = (setClass, id, actualizar) => {
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
    if (actualizar) {
      actualizar(idN);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("classes")) {
      const newMap = new Map(JSON.parse(localStorage.getItem("classes")));
      setClasses(newMap);
    }
  }, []);

  const guardar = () => {
    localStorage.setItem("classes", JSON.stringify([...classes]));
  };

  return [
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
  ];
};

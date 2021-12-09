import { relations, HORIZONTAL, VERTICAL } from "../Constants";
export const eventsSvg = {
  onMouseMoveNull: (event) => {
    event.target.style.cursor = "pointer";
  },
  onMouseUp: (setCurrentClass, event) => {
    event.stopPropagation();
    setCurrentClass(null);
    event.target.style.cursor = "default";
  },
  onMouseDown: (setCurrentClass, key, event) => {
    if (event.button === 0) {
      setCurrentClass(key);
    }
  },
  onMouseDownDependency: (
    setFromClass,
    fromClass,
    key,
    value,
    classes,
    setClasses,
    setAction,
    event
  ) => {
    event.stopPropagation();
    const idFrom = fromClass;
    if (event.button === 0) {
      if (!idFrom.current) {
        value.color = "blue";
        setFromClass(key);
      } else if (idFrom.current !== key) {
        if (!classes.get(idFrom.current).dependencies.includes(key)) {
          setClasses(
            classes.set(idFrom.current, {
              ...classes.get(idFrom.current),
              dependencies: [...classes.get(idFrom.current).dependencies, key],
            })
          );
          setFromClass(null);
          setAction(relations.NONE);
        }
      }
    } else if (event.button === 2) {
      setFromClass(null);
      setAction(relations.NONE);
    }
  },
  onMouseDownInheritance: (
    setFromClass,
    fromClass,
    key,
    value,
    classes,
    setAction,
    event
  ) => {
    event.stopPropagation();
    const idFrom = fromClass;
    if (event.button === 0) {
      if (!idFrom.current) {
        value.color = "blue";
        setFromClass(key);
      } else if (idFrom.current !== key) {
        classes.get(idFrom.current).inheritances = [key];
        setAction(relations.NONE);
        setFromClass(null);
      }
    } else if (event.button === 2) {
      setAction(relations.NONE);
    }
  },
  onMouseMove: (currentClass, classes, setClasses, event) => {
    event.target.style.cursor = "pointer";
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
      document
        .getElementById(currentClass.current)
        .setAttributeNS(
          null,
          "transform",
          "translate(" + newValue.x + "," + newValue.y + ")"
        );
      classes.set(currentClass.current, newValue);
      setClasses(classes);
    }
  },
};

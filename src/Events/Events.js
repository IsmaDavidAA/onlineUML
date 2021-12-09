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
          const g = document.getElementById(idFrom.current);
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line.setAttribute("x1", 0);
          line.setAttribute("y1", 0);
          console.log(classes.get(idFrom.current).x, value.x);
          line.setAttribute(
            "x2",
            value.x - classes.get(idFrom.current).x + value.width / 2
          );
          line.setAttribute("y2", value.y - classes.get(idFrom.current).y);
          line.setAttribute("stroke", "black");
          line.setAttribute("id", `${idFrom.current}-line-${key}`);
          g.appendChild(line);
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

        const g = document.getElementById(idFrom.current);
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("x1", 0);
        line.setAttribute("y1", 0);
        console.log(classes.get(idFrom.current).x, value.x);
        line.setAttribute(
          "x2",
          value.x - classes.get(idFrom.current).x + value.width / 2
        );
        line.setAttribute("y2", value.y - classes.get(idFrom.current).y);
        line.setAttribute("stroke", "black");
        line.setAttribute("id", `${idFrom.current}-line-${key}`);
        g.appendChild(line);
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

      classes.get(currentClass.current).dependencies.map((dependency) => {
        const line = document.getElementById(
          `${currentClass.current}-line-${dependency}`
        );
        line.setAttribute(
          "x2",
          classes.get(dependency).x -
            newValue.x +
            classes.get(dependency).width / 2
        );
        line.setAttribute("y2", classes.get(dependency).y - newValue.y);
      });

      classes.get(currentClass.current).inheritances.map((inheritance) => {
        const line = document.getElementById(
          `${currentClass.current}-line-${inheritance}`
        );
        line.setAttribute(
          "x2",
          classes.get(inheritance).x -
            newValue.x +
            classes.get(inheritance).width / 2
        );
        line.setAttribute("y2", classes.get(inheritance).y - newValue.y);
      });

      classes.set(currentClass.current, newValue);
      setClasses(classes);
    }
  },
};

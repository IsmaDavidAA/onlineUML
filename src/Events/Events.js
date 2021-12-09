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
    if (event.button === 0) {
      if (!fromClass.current) {
        value.color = "blue";
        setFromClass(key);
      } else if (fromClass.current !== key) {
        if (!classes.get(fromClass.current).dependencies.includes(key)) {
          setClasses(
            classes.set(fromClass.current, {
              ...classes.get(fromClass.current),
              dependencies: [
                ...classes.get(fromClass.current).dependencies,
                key,
              ],
            })
          );
          const g = document.getElementById(fromClass.current);
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line.setAttribute("x1", 0);
          line.setAttribute("y1", 0);
          line.setAttribute(
            "x2",
            value.x - classes.get(fromClass.current).x + value.width / 2
          );
          line.setAttribute("y2", value.y - classes.get(fromClass.current).y);
          line.setAttribute("stroke", "black");
          line.setAttribute("id", `${fromClass.current}-line-${key}`);
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
    if (event.button === 0) {
      if (!fromClass.current) {
        value.color = "blue";
        setFromClass(key);
      } else if (fromClass.current !== key) {
        classes.get(fromClass.current).inheritances = [key];
        const g = document.getElementById(fromClass.current);
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("x1", 0);
        line.setAttribute("y1", 0);
        line.setAttribute(
          "x2",
          value.x - classes.get(fromClass.current).x + value.width / 2
        );
        line.setAttribute("y2", value.y - classes.get(fromClass.current).y);
        line.setAttribute("stroke", "black");
        line.setAttribute("id", `${fromClass.current}-line-${key}`);
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
        updateLine(
          newValue,
          currentClass.current,
          dependency,
          classes.get(dependency)
        );
      });

      classes.get(currentClass.current).inheritances.map((inheritance) => {
        updateLine(
          newValue,
          currentClass.current,
          inheritance,
          classes.get(inheritance)
        );
      });

      classes.forEach((value, key) => {
        if (classes.get(key).dependencies.includes(currentClass.current)) {
          updateLine(
            value,
            key,
            currentClass.current,
            classes.get(currentClass.current)
          );
        }
      });
      classes.set(currentClass.current, newValue);
      setClasses(classes);
    }
  },
};

const updateLine = (value, key, currentKey, currentClass) => {
  const line = document.getElementById(`${key}-line-${currentKey}`);
  line.setAttribute("x2", currentClass.x - value.x + currentClass.width / 2);
  line.setAttribute("y2", currentClass.y - value.y);
};

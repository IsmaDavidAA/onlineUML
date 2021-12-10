import { relations, HORIZONTAL, VERTICAL } from "../Constants";
import { calculator } from "../utils/Calculator";
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
          createLine(
            g,
            value,
            key,
            fromClass.current,
            classes.get(fromClass.current)
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
    if (event.button === 0) {
      if (!fromClass.current) {
        value.color = "blue";
        setFromClass(key);
      } else if (fromClass.current !== key) {
        if (!classes.get(fromClass.current).inheritances.includes(key)) {
          if (classes.get(fromClass.current).inheritances.length > 0) {
            removeLine(
              fromClass.current,
              classes.get(fromClass.current).inheritances[0]
            );
          }
          classes.get(fromClass.current).inheritances = [key];
          const g = document.getElementById(fromClass.current);
          createLine(
            g,
            value,
            key,
            fromClass.current,
            classes.get(fromClass.current)
          );
          setAction(relations.NONE);
          setFromClass(null);
        }
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
        if (classes.get(key).inheritances.includes(currentClass.current)) {
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

export const createLine = (g, value, key, currentKey, currentClass) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", 0);
  line.setAttribute("y1", 0);
  line.setAttribute("x2", value.x - currentClass.x + value.width / 2);
  line.setAttribute("y2", value.y - currentClass.y);
  line.setAttribute("stroke", "black");
  line.setAttribute("id", `${currentKey}-line-${key}`);
  const pol = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon" //polyline, dos rayas
  );
  var x2=value.x - currentClass.x + value.width / 2;
  var y2 = value.y - currentClass.y;
  pol.setAttribute("points",x2/8+","+y2/12+" "+0+","+0+" "+y2/12+","+x2/8);
  pol.setAttribute(
    "style",
    `fill:white; stroke:black; stroke-width:1;` //polyline fill:none
  );
  g.appendChild(pol);
  g.appendChild(line);
};

const updateLine = (value, key, currentKey, currentClass) => {
  const line = document.getElementById(`${key}-line-${currentKey}`);
  line.setAttribute("x2", currentClass.x - value.x + currentClass.width / 2);
  line.setAttribute("y2", currentClass.y - value.y);
};

const removeLine = (currentKey, key) => {
  const line = document.getElementById(`${currentKey}-line-${key}`);
  line.remove();
};

export const eventsCanvas = {
  onMouseInheritancesDown: (
    actualizar,
    classes,
    fromClass,
    setAction,
    setFromClass,
    event
  ) => {
    if (event.button === 0) {
      classes.forEach((value, key) => {
        if (calculator.isItOverClass(value, event)) {
          if (!fromClass.current) {
            value.color = "blue";
            fromClass.current = key;
          } else if (fromClass.current !== key) {
            classes.get(fromClass.current).inheritances = [key];
            setAction(relations.NONE);
            setFromClass(null);
          }
        }
      });
    } else {
      setAction(relations.NONE);
    }
    actualizar();
  },
  onMouseCommonDown: (
    classes,
    setCurrentClass,
    setVisibleMenu,
    setPositionMenu,
    event
  ) => {
    if (event.button === 0) {
      classes.forEach((value, key) => {
        if (calculator.isItOverClass(value, event)) {
          setCurrentClass(key);
        }
      });
      setVisibleMenu(false);
    } else if (event.button === 2) {
      classes.forEach((value, key) => {
        if (calculator.isItOverClass(value, event)) {
          setPositionMenu({ x: event.clientX, y: event.clientY });
          setVisibleMenu(true);
        }
      });
    }
  },
  onMouseDependencyDown: (
    classes,
    fromClass,
    setAction,
    setFromClass,
    actualizar,
    event
  ) => {
    if (event.button === 0) {
      classes.forEach((value, key) => {
        if (calculator.isItOverClass(value, event)) {
          if (!fromClass.current) {
            value.color = "blue";
            fromClass.current = key;
          } else if (fromClass.current !== key) {
            if (!classes.get(fromClass.current).dependencies.includes(key)) {
              classes.get(fromClass.current).dependencies.push(key);
              setAction(relations.NONE);
              setFromClass(null);
            }
          }
        }
      });
    } else {
      setAction(relations.NONE);
    }
    actualizar();
  },

  onMouseMove: (classes, setClasses, currentClass, actualizar, event) => {
    onMouseMoveSelectClass(classes, event);
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
      classes.set(currentClass.current, newValue);
      setClasses(classes);
    }
    actualizar();
  },
};

export const onMouseMoveSelectClass = (classes, event) => {
  classes.forEach((value, key) => {
    if (calculator.isItOverClass(value, event)) {
      event.target.style.cursor = "pointer";
    } else {
      event.target.style.cursor = "default";
    }
  });
};

import { calculator } from "../utils/Calculator";
export const events = {
  onMousedown: (
    relations,
    fromClass,
    classes,
    setAction,
    actualizar,
    event
  ) => {
    if (event.button === 0) {
      classes.forEach((value, key) => {
        if (calculator.isItOverClass(value, event)) {
          if (!fromClass) {
            value.color = "blue";
            fromClass = key;
          } else if (fromClass !== key) {
            classes.get(fromClass).inheritances = [key];
            setAction(relations.NONE);
            fromClass = null;
          }
        }
      });
    } else {
      setAction(relations.NONE);
    }
    actualizar();
  },
};

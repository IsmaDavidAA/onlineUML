export const calculator = {
  calculateHeightClass: (attributes, methods) => {
    return 22 + 16 * attributes.length;
  },
  calculateWidthClass: (attributes, name) => {
    let max = 0;
    attributes.forEach((element) => {
      if (element.length > max) {
        max = element.length;
      }
    });
    return max * 7.5 > name.length * 12 ? max * 7.5 : name.length * 12;
  },
};

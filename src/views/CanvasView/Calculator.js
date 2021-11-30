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
};

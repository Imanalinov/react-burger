export const initArrayPrototype = () => {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, "last", {
    get: function last() {
      if (this.length === 0) {
        return undefined;
      }
      return this[this.length - 1];
    }
  });
};


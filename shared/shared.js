export const getPlainType = (target) => Object.prototype.toString.call(target).slice(8, -1).toLowerCase()

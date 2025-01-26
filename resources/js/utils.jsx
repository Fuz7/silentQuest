function isObject(variable) {
  return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
}

export {isObject}
module.exports = function parseStringArray(arraystring) {
  return arraystring.split(",").map(tech => tech.trim());
};

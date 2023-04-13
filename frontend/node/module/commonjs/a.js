
// module.exports = "Module A";
exports.A = "Module A";
exports.getModuleB = () => {
  const b = require("./b");
  console.log(b);
};

const a = require("./a");
const b = require("./b");
// const es = require("./es.mjs").default;
// import es from './es.mjs'

console.log(a.A);
a.getModuleB();
// console.log(es);

import('./es.mjs').then(res => {
  console.log(res.default);
})

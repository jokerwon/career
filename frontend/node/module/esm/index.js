import a from "./a.js";
// import { name } from './commonjs.cjs'; // 不可直接结构
import commonjs from "./commonjs.cjs";

console.log(a);

const { name } = commonjs;
console.log(name);

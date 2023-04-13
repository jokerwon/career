import { Plugin, ResolvedConfig } from "vite";

// 虚拟模块名称
const VIRTUAL_FIB_MODULE_ID = "virtual:fib";
// Vite 中约定对于虚拟模块，解析后的路径需要加上`\0`前缀
const RESOLVED_VIRTUAL_FIB_MODULE_ID = "\0" + VIRTUAL_FIB_MODULE_ID;

const VIRTUAL_ENV_MODULE_ID = "virtual:env";
const RESOLVED_VIRTUAL_ENV_MODULE_ID = "\0" + VIRTUAL_ENV_MODULE_ID;

export default function virtualModulePlugin(): Plugin {
  let config: ResolvedConfig | null = null;

  return {
    name: "vite-plugin-virtual-module",
    configResolved(_config) {
      console.log("vite-plugin-virtual-module");

      config = _config;
    },
    resolveId(id) {
      if (id === VIRTUAL_FIB_MODULE_ID) {
        return RESOLVED_VIRTUAL_FIB_MODULE_ID;
      }
      if (id === VIRTUAL_ENV_MODULE_ID) {
        return RESOLVED_VIRTUAL_ENV_MODULE_ID;
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_FIB_MODULE_ID) {
        return "export default function fib(n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2); }";
      }
      if (id === RESOLVED_VIRTUAL_ENV_MODULE_ID) {
        // return `export default ${JSON.stringify(config.env)}`;
        return promiseData();
      }
    },
  };
}

function promiseData() {
  return Promise.resolve("export default { promiseData: 'done' }");
}

import { Plugin } from "vite";
import resolve from "resolve";
import fs from "fs/promises";
import { transform as svgrTransform } from "@svgr/core";

interface SvgrOptions {
  // svg 资源模块默认导出，url 或者组件
  defaultExport?: "url" | "component";
}

export default function vitePluginSVGR(options: SvgrOptions = {}): Plugin {
  const { defaultExport = "component" } = options;

  return {
    name: "vite-plugin-svgr",
    configResolved(_config) {
      console.log("vite-plugin-svgr");
    },
    async transform(code, id) {
      // 1. 根据 id 入参过滤出 svg 资源；
      if (!id.endsWith(".svg")) {
        return code;
      }

      // 解析 esbuild 的路径，后续转译 jsx 会用到，我们这里直接拿 vite 中的 esbuild 即可
      const esbuildPkgPath = resolve.sync("esbuild", {
        basedir: require.resolve("vite"),
      });
      const esbuild = require(esbuildPkgPath);

      // 2. 读取 svg 文件内容
      const svg = await fs.readFile(id, "utf-8");
      // 3. 转为 React 组件的代码
      const svgRCStr = await svgrTransform(
        svg,
        {},
        { componentName: "ReactComponent" }
      );
      let compCode = svgRCStr;
      // 4. 处理默认导出为 url 的情况
      if (defaultExport === "url") {
        // 加上 Vite 默认的 `export default 资源路径`
        // code = `export default "/src/logo.svg"`
        compCode += code;
        compCode = compCode.replace(
          "export default ReactComponent;",
          ";export { ReactComponent };"
        );
      }
      // 5. 利用 esbuild，将组件中的 jsx 代码转译为浏览器可运行的代码
      const result = await esbuild.transform(compCode, { loader: "jsx" });
      return {
        code: result.code,
        map: null,
      };
    },
  };
}

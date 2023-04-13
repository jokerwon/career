import { defineConfig, normalizePath } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import inspect from "vite-plugin-inspect";
import AutoImport from 'unplugin-auto-import/vite'
import virtual from "./plugins/virtual-module";
import svgr from "./plugins/svgr";

const variablePath = normalizePath(path.resolve("./src/variable.scss"));

export default defineConfig({
  plugins: [
    react(),
    virtual(),
    svgr({
      defaultExport: 'url'
    }),
    inspect(),
    AutoImport({
      imports: ["react"],
      include: [/\.[tj]sx?$/],
      exclude: [],
      dts: true,
      dirs: [
        "src/components",
        "components",
      ],
      defaultExportByFilename: true,
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@assets": path.join(__dirname, "src/assets"),
    },
  },
  css: {
    preprocessorOptions: {
      modules: {
        // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
        // 其中，name 表示当前文件名，local 表示类名
        generateScopedName: "[name]__[local]___[hash:base64:5]",
        // generateScopedName: (name: string, filename: string, css: string) => {
        //   var path = require('path');
        //   var i = css.indexOf('.' + name);
        //   var line = css.substr(0, i).split(/[\r\n]/).length;
        //   var file = path.basename(filename, '.css');

        //   return '_' + file + '_' + line + '_' + name;
        // },
      },
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
});

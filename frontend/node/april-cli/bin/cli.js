#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

const { program } = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
// const inquirer = require("inquirer");
// const ejs = require("ejs");
const createHelper = require("../lib/create");
const packageInfo = require("../package.json");

const VERSION = packageInfo.version;

// 定义指令
program
    .command("create <app-name>")
    .description("create a new project")
    .option("-f, --force", "overwrite target directory if it exist")
    .action((name, options) => {
        createHelper(name, options);
    });
// 监听 --help 指令
program.on("--help", () => {
    console.log(`
        ${figlet.textSync("April", {
            font: "Ghost",
            width: 80,
            whitespaceBreak: true,
        })}
    `);
    // 新增说明信息
    console.log(
        `\r\nRun ${chalk.cyan(
            "ap <command> --help"
        )} for detailed usage of given command\r\n`
    );
});

program.version(`v${VERSION}`).usage("<command> [option]");

// 解析用户执行命令传入参数
program.parse(process.argv);

// inquirer
//     .prompt([
//         {
//             type: "input",
//             name: "name",
//             message: "Input name",
//             default: "my-cli",
//         },
//     ])
//     .then((answer) => {
//         // 模板文件目录
//         const destUrl = path.resolve(__dirname, "templates");
//         // 控制台所在目录
//         const cwdUrl = process.cwd();
//         // 从模板读取文件
//         fs.readdir(destUrl, (err, files) => {
//             if (err) throw err;
//             files.forEach((file) => {
//                 // 使用 ejs 渲染对应的模版文件
//                 ejs.renderFile(path.join(destUrl, file), answer).then(
//                     (data) => {
//                         // 生成 ejs 处理后的模版文件
//                         fs.writeFileSync(path.join(cwdUrl, file), data);
//                     }
//                 );
//             });
//         });
//     });

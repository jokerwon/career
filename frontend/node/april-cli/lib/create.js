const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const Generator = require("./Generator");

module.exports = async function createHelper(name, options = {}) {
    // 当前命令行选择的目录
    const cwd = process.cwd();
    // 需要创建的目录地址
    const targetDir = path.join(cwd, name);

    // 判断目标目录是否存在
    if (fs.existsSync(targetDir)) {
        // 是否需要强制创建
        if (options.force) {
            await fs.removeSync(targetDir);
        } else {
            // 询问是否需要覆盖
            const { action } = await inquirer.prompt([
                {
                    name: "action",
                    type: "list",
                    message: "Target directory already exists.Pick an action:",
                    choices: [
                        {
                            name: "Overwrite",
                            value: "overwrite",
                        },
                        {
                            name: "Cancel",
                            value: false,
                        },
                    ],
                },
            ]);
            // 如果用户选择了取消，则退出
            if (!action) return;

            if (action === "overwrite") {
                // 移除已存在的目录
                console.log(`\r\nRemoving...`);
                await fs.remove(targetDir);
            }
        }
    }

    // 创建目录
    const generator = new Generator(name, targetDir);
    // 开始创建
    generator.create();
};

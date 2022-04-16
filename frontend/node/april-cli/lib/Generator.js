const path = require("path");
const util = require("util");
const chalk = require("chalk");
const inquirer = require("inquirer");
const downloadGitRepo = require("download-git-repo"); // 不支持 Promise，需要手动将其 promisify
const { getRepoList, getTagList } = require("./http");
const { wrapLoading } = require("./utils");

class Generator {
    // 目录名称
    name;
    // 创建位置
    targetDir;
    // 下载 git 资源的工具实例
    downloadGitRepo = null;

    constructor(name, targetDir) {
        this.name = name;
        this.targetDir = targetDir;
        // 对 download-git-repo 进行 promise 化改造
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    // 从远程获取 repo 列表供用户选择，并返回用户选择的 repo
    async getRepo() {
        const repoList = await wrapLoading(
            getRepoList,
            "Fetching repositories..."
        );
        if (!repoList) return;

        // 获取所有模板名称
        const repoNames = repoList.map((e) => e.name);
        const { repo } = await inquirer.prompt({
            name: "repo",
            type: "list",
            choices: repoNames,
            message: "Choose a template to create project: ",
        });
        return repo;
    }

    // 从远程获取 tag 列表供用户选择，并返回用户选择的 tag
    async getTag(repo) {
        const tags = await wrapLoading(getTagList, "Fetching tags...", repo);
        if (!tags) return;

        // 获取所有 tag 名称
        const tagNames = tags.map((item) => item.name);

        // 询问用户选择 tag
        const { tag } = await inquirer.prompt({
            name: "tag",
            type: "list",
            choices: tagNames,
            message: "Choose a tag to create project",
        });

        return tag;
    }

    // 从远程下载模板资源
    async download(repo, tag) {
        // 拼接下载地址
        const templateUri = `zhurong-cli/${repo}${tag ? "#" + tag : ""}`;
        // 创建位置
        const savingDir = path.resolve(process.cwd(), this.targetDir);
        // 下载模板
        await wrapLoading(
            this.downloadGitRepo,
            "Downloading template...",
            templateUri,
            savingDir
        );
    }

    async create() {
        // 获取用户选择的 repo
        const repo = await this.getRepo();
        // 获取用户选择的 tag
        const tag = await this.getTag(repo);
        // 下载模板到指定目录
        await this.download(repo, tag);

        // 提示用户如何使用
        console.log(
            `\r\nSuccessfully created project ${chalk.cyan(this.name)}`
        );
        console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
        console.log("  npm run dev\r\n");
    }
}

module.exports = Generator;

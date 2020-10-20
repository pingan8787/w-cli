#!/usr/bin/env node
/**
 * @file index.js
 * @author 公众号【前端自习课】
 * @description CLI 工具入口文件
 */
// 全局添加

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { Command } = require('commander');

const inquirer = require('./lib/inquirer');
const packageJson = require('./package.json');
const { mapActions } = require('./lib/common');
const createFunction = require('./lib/create');

// 清除控制台
clear();

// const runInputName = async () => {
//     const values = await inquirer.askCreateAppName();
//     console.log(values);
//     let appName = values.name;
//     console.log(chalk.yellow(`Begin create app: ${appName}`))
// };

console.log(chalk.yellow(figlet.textSync('Pingan8787', {
    horizontalLayout: 'full'
})));

const program = new Command();

// 批量添加
Reflect.ownKeys(mapActions).forEach((action) => {
    program.command(action) //配置命令的名字
        .alias(mapActions[action].alias) // 命令的别名
        .description(mapActions[action].description) // 命令对应的描述
        .action(() => {  //动作
            if (action === '*') {  //访问不到对应的命令 就打印找不到命令
                console.log(mapActions[action].description);
            } else {
                console.log(action);
                // 分解命令 到文件里 有多少文件 就有多少配置 create config
                // lee-cli create project-name ->[node,lee-cli,create,project-name]
                console.log(process.argv);
            }
        })
});


// 1. 版本
program
    .version(packageJson.version)
    .usage('<command [options]>');

// 2. 创建 starter
program
    .command('create <app-name>')
    .alias('-c')
    .description('create a new webpack-starter')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(appname => {
        console.log("current project name:", appname)
        createFunction(appname);
    })

// 触发 --help 后打印一些信息
program.on('--help', () => {
    Reflect.ownKeys(mapActions).forEach((action) => {
        mapActions[action].examples.forEach((example) => {
            console.log(`  ${example}`);
        })
    })
    console.log(`-----`);
    console.log(`  create by ${chalk.cyan('公众号【前端自习课】')} 关注获取更多有趣的前端知识`);
    console.log(`  more click ${chalk.red('https://github.com/pingan8787')}`);
    console.log(`-----`);
});

// 为每个命令天啊及 --help
program.commands.forEach(c => c.on('--help', () => console.log()));

// 开始解析参数
program.parse(process.argv);

// 无任何命令时输出帮助信息
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

program.parse(process.argv);
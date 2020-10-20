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
const {Command} = require('commander');

const inquirer = require('./lib/inquirer');
const packageJson = require('./package.json');

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

// 1. 版本
program
    .version(packageJson.version)
    .usage('<command [options]>');

// 2. 可选参数
program
    .option('-d, --debug', 'create a webpack-starter')

// 3. 创建 starter
program
    .command('create <app-name>')
    .description('create a new webpack-starter')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .action(appname => {
        console.log("current project name:", appname)
    })

// 触发 --help 后打印一些信息
program.on('--help', () => {
    console.log();
    console.log(`  create by ${chalk.cyan('公众号【前端自习课】')} 关注获取更多有趣的前端知识`);
    console.log(`  more click ${chalk.red('https://github.com/pingan8787')}`)
    console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

// 开始解析参数
program.parse(process.argv);

// 无任何命令时输出帮助信息
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

program.parse(process.argv);
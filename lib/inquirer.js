/**
 * @file index.js
 * @author 公众号【前端自习课】
 * @description CLI 工具入口文件
 */

const inquirer = require('inquirer');

module.exports = {
    askCreateAppName: () => {
        const questions = [
            {
                name: 'name',
                type: 'input',
                message: 'Enter app name:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a app name.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }
}
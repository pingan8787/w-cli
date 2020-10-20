// 根据我们想要实现的功能配置执行动作，遍历产生对应的命令
const mapActions = {
    config: { //配置文件
        alias: 'conf', //别名
        description: 'config project variable', // 描述
        examples: [ //用法
            'w-cli config set <k> <v>',
            'w-cli config get <k>'
        ]
    },
    '*': {
        alias: '', //别名
        description: 'command not found', // 描述
        examples: [] //用法
    }
}
module.exports = {
    mapActions
};
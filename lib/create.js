const axios = require('axios');
// 1).获取仓库列表
const fetchReopLists = () => {
    // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板
    return axios.get('https://api.github.com/repos/pingan8787/Webpack-Quickly-Starter')
  };
  

module.exports = projectName => {
    let repos = fetchReopLists();
    console.log(repos);
    repos.then(data => {

        // repos = repos.map((item) => item.name);
        console.log(data.data.name);
    })
    console.log(`此处是文件${projectName}`);
}
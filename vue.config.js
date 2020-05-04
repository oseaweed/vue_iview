const path = require('path');
const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports = {
    productionSourceMap: false,// 生产环境不开启sourceMap
    chainWebpack: config => {
        config.resolve.alias 
            .set('@', resolve('src')) // 别名配置key,value自行定义，比如.set('@@', resolve('src/components'))
    },
};

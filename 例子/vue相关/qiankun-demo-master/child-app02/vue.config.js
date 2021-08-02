/*
 * @Author: jing.chen
 * @Date: 2020-10-29 17:18:43
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-10-29 17:18:46
 * @Description: 
 */
const port = 9020;
module.exports = {
    devServer: {
        port,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    configureWebpack: {
        output: {
            library: 'child',
            libraryTarget: 'umd'
        }
    }
};

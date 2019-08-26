module.exports = {
    publicPath: './',
    productionSourceMap: false,
    // 输出文件目录
    outputDir: 'dist',
    ////放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir:'static',
    devServer: {
        port: 9527,
        https: false, // https:{type:Boolean}
        open: true,
        // 代理设置
        proxy: {
            '/api':{
                // target:'http://192.168.1.166:9090', // 后台url
                // target:'http://192.168.1.55:8080', // 胡宣化本地
                // target:'http://192.168.1.135:5050', // 文林本地
                target:'http://192.168.56.193:8080/mstage', // 吕锡乐
                // target:'http://192.168.1.163:8080', // 王依霖
                // target:'http://192.144.144.44:9527', // 线上
                // target:'http://192.168.1.57:8080', // 张态本地
                // target:'http://192.168.1.93:8080', // 吕锡乐
                // target:'http://192.168.1.93:9528', // 吕锡乐
                // target:'http://192.168.1.163:8080', // 王依霖
                // target:'http://192.168.1.211:5555', // 吕锡乐
                // target:'http://192.168.1.93:8080', // 吕锡乐
                // target:'http://192.168.1.163:9529', // 王依霖
                // target:'http://192.144.144.44:9527', // 线上
                // target:'http://192.168.1.211:5555', // 香河211
                changeOrigin:true,  // 允许跨域
                ws: true,
                // 请求api
                pathRewrite:{
                    '^/api': ''
                }
            },
            // '/ms':{
            //     target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
            //     changeOrigin: true
            // }
        }
    }
}

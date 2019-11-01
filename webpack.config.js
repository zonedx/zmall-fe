

var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
    },
    output:{
        path: __dirname+'/dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    //配置代理   跨域访问
    devServer: {
        proxy: {
            '/product':{
                target:'http://www.dlzonemall.com',
                changeOrigin:true,
            }
        }
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: "style-loader!css-loader" }
            { test: /\.css$/, loader: ExtractTextPlugin.extract({fallback:"style-loader",use:"css-loader"}) },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve : {
        alias : {
            // node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '登录')),
        // new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        // new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        // new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}


module.exports = config;
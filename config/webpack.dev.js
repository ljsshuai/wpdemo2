const path = require("path");
const uglify = require('uglifyjs-webpack-plugin');
const  htmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var website ={ publicPath:"http://localhost:8888/"}//这里的ip和端口，是你本机的ip或者是你devServer配置的IP和端口
module.exports= {
    mode: 'development',
    //入口文件的配置项
    entry: {
        //里面的main是可以随便写
        main:'./src/main.js',
        main2:'./src/main2.js' //新增一个入口文件
    },
    output: {
        //打包的路径
        path: path.resolve(__dirname, '../dist'),
        //打包的文件名称
        filename: '[name].js',
        publicPath:website.publicPath
    },
    //模块：例如解读CSS，图片如何转换，压缩
    module:{
        rules:[
            //css loader
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test:/\.(png|jpg|gif|jpeg)/, //匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是制定使用loader和loader的配置参数
                    options:{
                        limit:500, //是将小于500B的文件打包成base64格式写入js
                        outputPath:'images/'//打包后的图片放到image文件夹下
                    }
                }]
            },
        ]
    },
    //插件，用于生产模块的各项功能
    plugins:[
        new uglify(),  //js压缩插件
        new htmlPlugin({
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是去掉属性的双引号。
            },
            hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template:'./src/index.html' //是要打包的html模版路径和文件名称。
        }),
        new ExtractTextPlugin("css/index.css")
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'../dist'),
        //服务器的IP地址，可以使IP也可以使localhost
        host:"localhost",
        //服务器压缩是否开启
        compress:true,
        //配置服务端口号
        port:8888
    }
}



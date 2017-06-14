const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    entry: __dirname + '/src/Clipper.js',
    output: {
        path: __dirname + '/lib',
        filename: 'Clipper.js'
    },

    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            }
        ]
    },

    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    plugins: [
        // new CleanWebpackPlugin(['dist'], {
        //     "root": __dirname,
        //     verbose: true,
        //     dry: false
        // }),
        new webpack.BannerPlugin("Copyright Eugene proprietary rights."),   //打包文件抬头
        new webpack.optimize.UglifyJsPlugin({               //压缩JS代码
            output: {
                comments: false                             // remove all comments
            },
            compress: {
                warnings: false                             //不显示warning
            }
        })
    ]
};

module.exports = config;

var webpack = require('webpack');
var path = require('path');;
var BUILD_DIR = path.resolve(__dirname + '/dist');
var APP_DIR = path.resolve(__dirname + '/src');
var IMAGE_DIR = path.resolve(__dirname + '/images');

const VENDOR_LIBS = [
    'react', 'react-dom', 'jquery'
]

var config = {
    entry: {
        bundle: APP_DIR + '/js/app.js',
        vendor: VENDOR_LIBS,
        summarydata: APP_DIR + '/js/summarydata.js',
        detaildata: APP_DIR + '/js/detaildata.js',
        eurefdata: APP_DIR + '/js/eurefdata.js'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js',
        publicPath: '/GEUK/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader',
                query: {
                presets: [
                   'es2015', 
                   'react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png)$/,
                include: IMAGE_DIR,
                use: {
                    loader: "file-loader",
                    options: {
                        name: 'public/[path][name].[ext]'
                    }
                }
            }

        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: {
                    enforce: true,
                    priority: 1
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2,
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all'
                },
                summarydata: {
                    test: /summarydata.js/,
                    priority: 3,
                    name: 'summarydata',
                    enforce: true,
                    chunks: 'all'
                },
                detaildata: {
                    test: /detaildata.js/,
                    priority: 4,
                    name: 'detaildata',
                    enforce: true,
                    chunks: 'all'
                },
                eurefdata: {
                    test: /eurefdata.js/,
                    priority: 5,
                    name: 'eurefdata',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: BUILD_DIR,
        port: 3333
    }
};
module.exports = config
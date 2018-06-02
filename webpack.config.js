var webpack = require('webpack');
var path = require('path');;
var BUILD_DIR = path.resolve(__dirname + '/dist');
var APP_DIR = path.resolve(__dirname + '/src');
var IMAGE_DIR = path.resolve(__dirname + '/images');

var config = {
    entry: APP_DIR + '/js/app.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/'
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
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: BUILD_DIR,
        port: 3333
    }
};
module.exports = config
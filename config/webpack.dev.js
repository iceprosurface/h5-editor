const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'app': [path.resolve(__dirname, '../src/main.js')],
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: './',
        filename: 'js/[name][hash].js',
    },
    module: {
        rules: [{
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader'],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.html$/,
            loader: 'html-loader',
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192',
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './../index.html'),
            inject: true,
            chunks: ['app'],
        }),
    ],
};

const path = require('path');
const loader = require('sass-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/js/index.js'),
    module: {
        rules: [{
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Snake Game',
            filename: 'index.html',
            template: path.resolve('src/index.html'),
        }),
        new MiniCssExtractPlugin(),
    ],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'bundle.js',
        assetModuleFilename: 'assets/[name][ext]'
    }
}
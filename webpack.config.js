const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { isProd, isDev, isMock } = require('./build/env');
const proxyTable = require('./build/proxyTable');

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: [require('autoprefixer')({
            browsers: [
                'Android > 4',
                'iOS > 8'
            ]
        })]
    }
};


module.exports = {
    entry: './src/app.tsx',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/static')
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    mode: isProd ? 'production' : 'development',

    devtool: 'cheap-source-map',

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                include: /src/,
                loader: 'tslint-loader',
                options: {
                    quiet: true,
                    cache: true,
                    failOnError: true
                }
            },
            {
                test: /\.(t|j)sx?$/,
                use: 'ts-loader',
                include: /src/
            },
            {
                test: /\.less$/,
                use: isDev
                    ? ['style-loader', 'css-loader', postcssLoader, 'less-loader']
                    : ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', postcssLoader, 'less-loader']
                    })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            }
        ],
    },

    stats: {
        children: false
    },

    performance: {
        hints: false
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: isDev ? 'html/index.html' : '../html/index.html',
            template: 'template/index.ejs'
        }),
        new ExtractTextPlugin('[name].css')
    ]
};

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');
const { isMock } = require('./build/env');
const cookie = require('./build/cookie');

const proxyTable = require('./build/proxyTable');

const publicPath = '/smart/deploy';


function getProxyConfig() {
    return Object.keys(proxyTable)
        .map((key) => ({
            context: key,
            target: proxyTable[key],
            pathRewrite: {
                '^/xapi': ''
            },
            secure: proxyTable[key].indexOf('https') >= 0,
            headers: {
                Cookie: cookie
            },
            toProxy: true,
            changeOrigin: true
        }));
}

module.exports = Object.assign({}, config, {
    mode: 'development',

    output: {
        publicPath: publicPath
    },

    devServer: {
        open: true,
        openPage: './',
        port: 8080,
        host: '0.0.0.0',
        proxy: getProxyConfig(),
        historyApiFallback: {
            verbose: true,
            index: `${publicPath}/html/index.html`
        }
    }
});

// enable mock data
if (isMock) {
    module.exports.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/(.*)service\/(.*)/, function(resource) {
            resource.request = resource.request.replace(/service\/(.*)/, 'service/$1-mock');
        })
    )
}



const webpack = require('webpack');

const config = require('./config');

const BASE_PATH = process.env.BASE_PATH || '/';
const common = require('./webpack.config.common');

common.devtool = 'cheap-eval-source-map';
common.mode = 'development';
common.plugins.push(new webpack.HotModuleReplacementPlugin());
common.devServer = {
  hot: true,
  contentBase: config.serveDir,
  compress: true,
  historyApiFallback: {
    index: BASE_PATH,
  },
  host: '0.0.0.0',
  port: 4300,
  proxy: {
    '/admin/api/': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  },
};

module.exports = common;

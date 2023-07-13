const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.config.common');

common.devtool = 'inline-source-map';
common.mode = 'production';
common.plugins.push(new OptimizeCssAssetsPlugin());

common.optimization = {
  minimizer: [new TerserPlugin()],
};

module.exports = common;

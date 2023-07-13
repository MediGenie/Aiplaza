const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const config = require('./config');

const BASE_PATH = process.env.BASE_PATH || '/';
const NODE_ENV =
  process.env.BUILD_MODE === 'dev' ? 'development' : 'production';

const webpackPlugin =
  process.env.BUILD_MODE === 'dev'
    ? {
        template: config.srcHtmlLayout,
        inject: false,
        chunksSortMode: 'none',
        favicon: config.favicon,
        title: config.title + ' (개발모드)',
      }
    : {
        template: config.srcHtmlLayout,
        inject: false,
        favicon: config.favicon,
        title: config.title,
      };
const webpackModulePlugin =
  process.env.BUILD_MODE === 'dev'
    ? new webpack.NamedModulesPlugin()
    : new webpack.HashedModuleIdsPlugin();

module.exports = {
  name: 'client',
  entry: {
    app: [path.join(config.srcDir, 'index.js')],
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: config.distDir,
    publicPath: BASE_PATH,
  },
  resolve: {
    modules: ['node_modules', config.srcDir],
    alias: {
      '@core': path.resolve(__dirname, '../src/@core'),
      '@app': path.resolve(__dirname, '../src/app'),
      '@images': path.resolve(__dirname, '../src/images'),
    },
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new HtmlWebpackPlugin(webpackPlugin),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.BASE_PATH': JSON.stringify(BASE_PATH),
    }),
    webpackModulePlugin,
    new ExtractCssChunks(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // Modular Styles
      {
        test: /\.css$/,
        use: [
          process.env.BUILD_MODE === 'dev'
            ? { loader: 'style-loader' }
            : ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
        ],
        exclude: [path.resolve(config.srcDir, 'styles')],
        include: [config.srcDir],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.BUILD_MODE === 'dev'
            ? { loader: 'style-loader' }
            : ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: config.scssIncludes,
            },
          },
        ],
        exclude: [path.resolve(config.srcDir, 'styles')],
        include: [config.srcDir],
      },
      // Global Styles
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
        include: [path.resolve(config.srcDir, 'styles')],
      },
      {
        test: /\.scss$/,
        use: [
          ExtractCssChunks.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: config.scssIncludes,
            },
          },
        ],
        include: [path.resolve(config.srcDir, 'styles')],
      },
      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      // Files
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'static/[name].[ext]',
        },
      },
    ],
  },
};

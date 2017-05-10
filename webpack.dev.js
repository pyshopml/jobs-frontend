var webpack   = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var merge = require('webpack-merge');
var path      = require('path');

var baseConfig = require('./webpack.base');

var BUILD_DIR = path.join(__dirname, '/dist');
var APP_DIR   = path.join(__dirname, '/app');

var devConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_DIR + '/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('develop')
      }
    }),
  ],
  resolve: {
    alias: {
      'config': path.resolve(__dirname, './config')
    }
  },
};

module.exports = merge(devConfig, baseConfig)
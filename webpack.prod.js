var webpack   = require('webpack');
var path      = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var UglifyJsPlugin = require('uglify-js-plugin');

var BUILD_DIR = path.join(__dirname, '/dist');
var APP_DIR   = path.join(__dirname, '/app');


var config = {
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_DIR + '/index.html',
      excludeChunks: ['whm']
    }),
    new UglifyJsPlugin({
      beautify: false,
      output: {
        comments: false
      },
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
      }
    })
  ],
};

module.exports = config;
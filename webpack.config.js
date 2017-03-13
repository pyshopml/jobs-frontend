var webpack   = require('webpack');
var path      = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var BUILD_DIR = path.join(__dirname, '/dist');
var APP_DIR   = path.join(__dirname, '/app');


var config = {
  entry : {
    whm: 'webpack-hot-middleware/client',
    main: APP_DIR +'/index.tsx',
    vendor: APP_DIR + '/vendor.ts'
  },
  output : {
    path : BUILD_DIR,
    filename : '[name].bundle.js',
    publicPath: '/'
  },
  devServer:{
    contentBase: BUILD_DIR
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['main', 'vendor']
    }),
    new HtmlWebpackPlugin({
      template: APP_DIR + '/index.html',
    }),
    new ExtractTextPlugin("styles.css"),
  ],
  module : {
    loaders : [
      {
        test : /(\.js|\.jsx|\.ts|\.tsx|)$/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test: /(\.ts|\.tsx)$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(css|scss)$/,
        include: [path.join(APP_DIR, 'containers'), path.join(APP_DIR, 'components')],
        loader: 'style-loader!css-loader?modules&camelCase!postcss-loader!sass-loader',
      },
      {
        test: /\.(css|scss)$/,
        include: APP_DIR,
        exclude: [path.join(APP_DIR, 'containers'), path.join(APP_DIR, 'components')],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader!sass-loader'
        })
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      /*
       {
       test: /\.(css|scss)$/,
       exclude: [
       APP_DIR + '/components/',
       APP_DIR + '/containers/'
       ],
       loader: ExtractTextPlugin.extract({
       fallback: 'style-loader',
       use: 'css-loader!postcss-loader!sass-loader'
       }),
       },
       {
       test: /\.css/,
       test: /\.jsx?$/,
       exclude: /node_modules/,
       loaders: ['babel-loader', 'eslint-loader']
       }
       */
    ]
  },
  /*
   eslint: {
   configFile: './.eslintrc'
   },
   */
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
  },
};

module.exports = config;
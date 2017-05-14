var webpack   = require('webpack');
var path      = require('path');
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
    new webpack.NoEmitOnErrorsPlugin (),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['main', 'vendor']
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.ProvidePlugin({
      config: 'config'
    })
  ],
  module : {
    loaders : [
      {
        test : /(\.js|\.jsx|\.ts|\.tsx|)$/,
        exclude: [
          /(node_modules|dist|tests)/,
            path.resolve(__dirname, '*.test.tsx'),
        ],
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test: /(\.ts|\.tsx)$/,
        exclude: [
          /(node_modules|dist|tests)/,
            path.resolve(__dirname, '*.test.tsx'),
        ],
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(css|scss)$/,
        include: [path.join(APP_DIR, 'containers'), path.join(APP_DIR, 'components'), path.join(APP_DIR, 'pages')],
        loader: 'style-loader!css-loader?modules&camelCase!postcss-loader!sass-loader',
      },
      {
        test: /\.(css|scss)$/,
        include: APP_DIR,
        exclude: [path.join(APP_DIR, 'containers'), path.join(APP_DIR, 'components'), path.join(APP_DIR, 'pages')],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader!sass-loader'
        })
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
  
    ]
  },
  resolve: {
    modules: [APP_DIR, "node_modules"],
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
  },
};

module.exports = config;
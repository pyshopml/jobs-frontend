var path = require('path')
var express = require('express')

var app = express()

var webpack = require('webpack')
var config = require('./webpack.dev.js')

var compiler = webpack(config)

var SRC_DIR = path.join(__dirname, 'src');
var DIST_DIR = path.join(__dirname, 'dist');

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
})

app.use(devMiddleware)
app.use(this.middleware = devMiddleware);
app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  var index = this.middleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html'));
  res.end(index);
}.bind(this));

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})

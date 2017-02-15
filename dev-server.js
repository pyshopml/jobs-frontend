var path = require('path')
var express = require('express')

var app = express()

var webpack = require('webpack')
var config = require('./webpack.config')

var compiler = webpack(config)

var DIST_DIR = path.join(__dirname, 'dist');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})

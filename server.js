import config from './webpack.config.cjs'
import chokidar from 'chokidar';
import express from 'express'
import http from 'http'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { renderApp } from './src/server-renderer.js'

const compiler = webpack(config);
const app = express();

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// app.use(function(req, res, next) {
//   require('./server/app')(req, res, next);
// });

app.get('*', function(req, res, next) {
  renderApp(req.path, function(err, page) {
    if (err) return next(err);
    res.send(page);
  });
});

const watcher = chokidar.watch(['server.js']);

// watcher.on('ready', function() {
//   watcher.on('all', function() {
//     console.log("Clearing server.js module cache from server");
//     Object.keys(require.cache).forEach(function(id) {
//       if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
//     });
//   });
// });

// compiler.plugin('done', function() {
//   console.log("Clearing /src/ module cache from server");
//   Object.keys(require.cache).forEach(function(id) {
//     if (/[\/\\]src[\/\\]/.test(id)) delete require.cache[id];
//   });
// });

const server = http.createServer(app);
server.listen(3000, 'localhost', function(err) {
  if (err) throw err;

  const addr = server.address();

  console.log('Listening at http://%s:%d', addr.address, addr.port);
});
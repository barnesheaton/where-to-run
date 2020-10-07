import config from './webpack.config.cjs'
import chokidar from 'chokidar';
import express from 'express'
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

app.get('*', function(req, res, next) {
  renderApp(req.path, function(err, page) {
    if (err) return next(err);
    res.send(page);
  });
});

const watcher = chokidar.watch(['server.js']);

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
/**
 * Change server.js to have ES6+ import syntax instead of Node’s require to test that Babel transpilation is happening correctly.
 */
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'

const app = express();
const compiler = webpack(config);

/**
 * Webpack Dev Middleware is middleware which can be mounted in an express server to serve the latest compilation of your bundle during development. 
 * This uses webpack 's Node API in watch mode and instead of outputting to the file system it outputs to memory.
 * whenever you save a change to a file, Webpack Dev Middleware creates a new build,
 */
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

/**
 * Hot Module Reloading (HRM) executes the change in the browser 
 */
app.use(webpackHotMiddleware(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3002

app.listen(PORT, function (err) {
  if (err) {
    return console.log(`Client Express Error: ${err}....`);
  }
  console.log(`Client started at http://localhost:${PORT}....`)
});


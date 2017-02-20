import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import users from './routes/users';
import auth from './routes/auth';

let app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api/users', users);
app.use('/api/auth', auth);

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'./index.html'));
});

app.listen(3000, () => console.log('Running on localhost:3000'));

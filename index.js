const express = require('express');
const config = require('./config');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const fakeHMR = require('./fake-hmr');
const api = require('./api');
const compiler = webpack(webpackConfig);
const cors = require("cors");
const db = require("./database");


const app = express();
fakeHMR.config({ app });

app.use(cors());
app.use(express.json());
app.use("", api);
// require('./webpackRunner');


app.listen(config.PORT, function () {
  console.log(`App currently running; navigate to localhost:${config.PORT} in a web browser.`);
});

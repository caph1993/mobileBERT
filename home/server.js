//@ts-check
const express = require('express');
const router = require('./src/routes/index');
const localsEjs = require('./locals-ejs');
const { PORT, BASE_URL, SERVER_KEY } = require('./env');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { createProxyMiddleware } = require('http-proxy-middleware');
const { NLP_PORT } = require('./env');

const app = express();

app.use(`${BASE_URL}/backend`, createProxyMiddleware({
  target: `http://localhost:${NLP_PORT}`,
  changeOrigin: true,
}));

app.set('view engine', 'ejs');
app.set('views', 'src/views');
Object.assign(app.locals, localsEjs);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(SERVER_KEY));
app.use(express.json());

app.use(BASE_URL, router);

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}${BASE_URL}`);
});
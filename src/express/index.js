'use strict';

require(`dotenv`).config();
const path = require(`path`);
const express = require(`express`);
const mocks = require(`../../mocks.json`);

const loginRouter = require(`./routes/login`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);
const registerRouter = require(`./routes/register`);
const searchRouter = require(`./routes/search`);
const categoriesRouter = require(`./routes/categories`);
const axios = require(`axios`);

const DEFAULT_PORT = `8000`;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use(`/search`, searchRouter);
app.use(`/categories`, categoriesRouter);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.set(`mocks`, mocks);

app.get(`/`, async (req, res) => {

  try {
    const result = await axios(`${process.env.API_URI}/api/articles`);
    return res.render(`index`, result);

  } catch (error) {
    return res.statusCode(req.statusCode).send(`Something goes wrong, try again later`);
  }
});

app.listen(DEFAULT_PORT, () => console.log(`Server has been started at ${DEFAULT_PORT}`));

'use strict';

const path = require(`path`);
const express = require(`express`);

const loginRouter = require(`./routes/login`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);
const registerRouter = require(`./routes/register`);
const searchRouter = require(`./routes/search`);
const categoriesRouter = require(`./routes/categories`);

const DEFAULT_PORT = `8000`;
const PUBLIC_DIR = `public`;


const app = express();
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use(`/search`, searchRouter);
app.use(`/categories`, categoriesRouter);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.get(`/`, (req, res) => {
  return res.render(`index`);
});

app.listen(DEFAULT_PORT, () => console.log(`Server has been started at ${DEFAULT_PORT}`));

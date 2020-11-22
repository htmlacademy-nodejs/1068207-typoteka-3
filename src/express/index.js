'use strict';

const express = require(`express`);
const loginRouter = require(`./routes/login`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);
const registerRouter = require(`./routes/register`);
const searchRouter = require(`./routes/search`);
const categoriesRouter = require(`./routes/categories`);

const DEFAULT_PORT = `8000`;

const app = express();
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use(`/search`, searchRouter);
app.use(`/categories`, categoriesRouter);

app.get(`/`, (req, res) => {
  return res.send(`Current route is /`);
});

app.listen(DEFAULT_PORT, () => console.log(`Server has been started at ${DEFAULT_PORT}`));

'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const articlesRouter = require(`../routes/api/articles`);
const categoriesRouter = require(`../routes/api/categories`);
const searchRouter = require(`../routes/api/search`);
const {readFile} = require(`../utils/_utils`);

const DEFAULT_PORT = 3000;

const getCurrentAppState = async () => {
  try {
    const result = await fs.readFile(`mocks.json`);
    return JSON.parse(result);
  } catch (error) {
    return [];
  }
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;

    const port = Number(parseInt(customPort, 10)) || DEFAULT_PORT;
    const app = express();
    app.set(`mocks`, await getCurrentAppState());
    app.set(`categories`, await readFile(`./data/categories.txt`));
    app.use(express.json());
    app.use(`/api`, articlesRouter);
    app.use(`/api`, categoriesRouter);
    app.use(`/api`, searchRouter);

    app.get(`/`, async (req, res) => {
      return res.send(`Hello, Api Service!`);
    });

    app.listen(port, () => console.log(`Server has been started at ${port}`));
  }
};

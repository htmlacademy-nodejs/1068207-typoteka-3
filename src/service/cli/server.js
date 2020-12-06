'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const articlesRouter = require(`../routes/api/articles`);
const categoriesRouter = require(`../routes/api/categories`);
const searchRouter = require(`../routes/api/search`);
const {getLogger} = require(`../utils/logger`);
const {readFile} = require(`../utils/_utils`);
const {HttpCode} = require(`../utils/_constants`);

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
    const logger = getLogger({name: `api`});

    const port = Number(parseInt(customPort, 10)) || DEFAULT_PORT;
    const app = express();
    app.set(`mocks`, await getCurrentAppState());
    app.set(`categories`, await readFile(`./data/categories.txt`));
    app.use(express.json());
    app.use(`/api`, articlesRouter);
    app.use(`/api`, categoriesRouter);
    app.use(`/api`, searchRouter);
    app.use((req, res) => {
      res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
      logger.error(`Route not found: ${req.url}`);
    });
    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
      });
      next();
    });

    app.get(`/`, async (req, res) => {
      return res.send(`Hello, Api Service!`);
    });

    try {
      app.listen(port, (error) => {
        if (error) {
          return logger.error(`An error occured on server creation: ${error.message}`);
        }
        return logger.info(`Server has been started at ${port}`);
      });
    } catch (error) {
      logger.error(`An error occured: ${error.message}`);
      process.exit(1);
    }
  }
};
